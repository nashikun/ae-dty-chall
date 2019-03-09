import {Component, HostListener, OnInit} from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {AnimeService} from '../../services/anime.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  latestAnimes = [];
  show = false;
  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 4,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  constructor(private animeService: AnimeService) {
  }

  ngOnInit() {
    const innerWidth = window.innerWidth;
    if (innerWidth >= 1024) {
      this.config.slidesPerView = 4;
    } else if (innerWidth >= 800) {
      this.config.slidesPerView = 3;
    } else if (innerWidth >= 500) {
      this.config.slidesPerView = 2;
    } else {
      this.config.slidesPerView = 1;
    }
    this.animeService.getLatest().subscribe(res => {
      this.latestAnimes = res;
      this.show = true;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const newWidth = event.target.innerWidth;
    if (newWidth >= 1024) {
      this.config.slidesPerView = 4;
    } else if (newWidth >= 800) {
      this.config.slidesPerView = 3;
    } else if (newWidth >= 500) {
      this.config.slidesPerView = 2;
    } else {
      this.config.slidesPerView = 1;
    }
  }
}
