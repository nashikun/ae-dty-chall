import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MatIconRegistry, PageEvent, Sort} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {ProfileService} from "../../services/profile.service";


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    loaded: boolean = false;
    allUsers = [];
    search: string = '';
    columnsToDisplay = ['username', 'createdAt'];
    pageSize: number = 5;
    pageNumber: number = 0;
    usersCount: number = 0;
    sortType: string = 'createdAt';
    sortOrder: string = 'desc';

    constructor(private _auth: AuthService, private _route: ActivatedRoute, private _profile: ProfileService) {
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
            this.getUsers();
        });
    }

    changePage(event: PageEvent) {
        this.pageSize = event.pageSize;
        this.pageNumber = event.pageIndex;
        this.getUsers();
    }

    sortUsers(event: Sort) {
        this.sortType = event.active;
        this.sortOrder = event.direction;
        this.getUsers();
    }

    getUsers() {
        //only show the spinner on the first loading. uncommenting the next line shows it on each oading but throws the sort header off
        // this.loaded = false;
        this._profile.getUsers(this.pageSize, this.pageNumber, this.search, this.sortType, this.sortOrder).subscribe(res => {
            this.allUsers = res.users;
            this.usersCount = res.count;
            this.loaded = true;
        }, err => {
            console.error(err);
            this.loaded = true;
        });
    }
}
