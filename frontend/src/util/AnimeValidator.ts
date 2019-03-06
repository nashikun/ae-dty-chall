import {FormControl} from '@angular/forms';
import {Injectable} from '@angular/core';
import {AnimeService} from '../services/anime.service';

@Injectable({
  providedIn: 'root'
})

export class AnimeValidator {

  timer: any;

  constructor(private _anime: AnimeService) {
  }

  available(control: FormControl) {

    clearTimeout(this.timer);

    return new Promise(resolve => {

      this.timer = setTimeout(() => {

        this._anime.getAnime(control.value).subscribe((res) => {
          if (res.body) {
            resolve({'anime exists': true});
          } else {
            resolve(null);
          }
        }, (err) => console.error(err));

      }, 1000);

    });
  }

}
