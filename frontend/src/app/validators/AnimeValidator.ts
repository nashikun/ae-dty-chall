import {Injectable} from '@angular/core';
import {AnimeService} from '../services/anime.service';
import {AbstractControl} from "@angular/forms";
import {of, timer} from "rxjs";
import {catchError, mapTo, switchMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class AnimeValidator {

    constructor(private _anime: AnimeService) {
    }

    available(control: AbstractControl) {
        return timer(1000).pipe(switchMap(() => {
            return this._anime.animeExists(control.value)
                .pipe(mapTo({exists: true}))
                .pipe(catchError(() => of(null)));
        }));
    }
}
