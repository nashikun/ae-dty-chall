import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {AnimeService} from '../../services/anime.service';
import {AnimelistService} from '../../services/animelist.service';
import {MatIconRegistry, PageEvent, Sort} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Anime} from "../../interfaces/anime";


@Component({
    selector: 'app-animes',
    templateUrl: './animes.component.html',
    styleUrls: ['./animes.component.css']
})
export class AnimesComponent implements OnInit {

    loaded: boolean = false;
    errors = {invalid: false};
    allAnimes: Anime[] = [];
    search: string = '';
    columnsToDisplay = ['name', 'score', 'rating', 'status'];
    pageSize: number = 5;
    pageNumber: number = 0;
    animesCount: number = 0;
    sortType: string = 'score';
    sortOrder: string = 'desc';

    constructor(private _auth: AuthenticationService, private _route: ActivatedRoute, private _anime: AnimeService, private _animelist: AnimelistService,
                private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon('star',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/baseline-star-24px.svg'));
        this.matIconRegistry.addSvgIcon('star_outline',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/baseline-star_border-24px.svg'));
    }

    ngOnInit() {
        this._route.queryParams.subscribe(params => {
            if (params.page && params.size) {
                this.pageSize = params.size;
                this.pageNumber = params.page - 1;
            }
            if (params.search) {
                this.search = params.search;
            }
            if (params.sort) {
                this.sortType = params.sort;
            }
            if (['asc', 'desc'].includes(params.order)) {
                this.sortOrder = params.order;
            }
            this.getAnimes();
        });
    }

    Add(anime: Anime) {
        this._animelist.addToList(anime._id, 'Plan To Watch').subscribe(() => {
            anime.status = 'Plan To Watch';
        });
    }

    Update(anime: Anime) {
        this._animelist.updateList(anime._id, anime.status, anime.watchedEpisodes).subscribe(() => {
            this.errors = {invalid: false}
        }, err => {
            this.errors = err.error || {};
        });
    }

    changePage(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.pageNumber = event.pageIndex;
        this.getAnimes();
    }

    sortAnimes(event: Sort) {
        this.sortType = event.active;
        this.sortOrder = event.direction;
        this.getAnimes();
    }

    getAnimes() {
        //only show the spinner on the first loading. uncommenting the next line shows it on each oading but throws the sort header off
        // this.loaded = false;
        this._anime.getAnimes(this.pageSize, this.pageNumber, this.search, this.sortType, this.sortOrder).subscribe(res => {
            this.allAnimes = res.animes.map(anime => {
                if (!anime.rating) {
                    anime.rating = {_id: '', rating: 'N/A'};
                }
                this.loaded = true;
                return anime;
            });
            this.animesCount = res.count;
        }, err => {
            console.error(err);
            this.loaded = true;
        });
    }

    rateAnime(anime) {
        if (anime.rating._id) {
            this._anime.changeRating(anime._id, anime.rating._id, anime.rating.rating).subscribe();
        } else {
            this._anime.addRating(anime._id, anime.rating.rating).subscribe();
        }
    }
}
