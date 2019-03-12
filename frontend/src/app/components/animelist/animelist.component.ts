import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AnimelistService} from '../../services/animelist.service';
import {Anime} from "../../interfaces/anime";

@Component({
  selector: 'app-anime',
  templateUrl: './animelist.component.html',
  styleUrls: ['./animelist.component.css']
})
export class AnimelistComponent implements OnInit {

  constructor(private animelistService: AnimelistService, private _router: Router, private activeroute: ActivatedRoute) {
  }

  watched: Anime[] = [];
  onHold: Anime[] = [];
  planToWatch: Anime[] = [];
  dropped: Anime[] = [];
  watching: Anime[] = [];
  columnsToDisplay = ['Anime'];

  ngOnInit() {
    this.activeroute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('user')) {
        this.animelistService.getList(paramMap.get('user')).subscribe(res => {
          this.watched = res['Watched'];
          this.onHold = res['On Hold'];
          this.planToWatch = res['Plan To Watch'];
          this.dropped = res['Dropped'];
          this.watching = res['Watching'];
        });
      } else {
        this.animelistService.getMyList().subscribe((res) => {
          this.watched = res['Watched'];
          this.onHold = res['On Hold'];
          this.planToWatch = res['Plan To Watch'];
          this.dropped = res['Dropped'];
          this.watching = res['watching'];
        });
      }
    });
  }
}

