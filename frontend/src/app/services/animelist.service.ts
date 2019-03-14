import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {environment} from 'src/environments/environment';

const BACKEND = environment.backend;

@Injectable({
    providedIn: 'root'
})
export class AnimelistService {

    constructor(private http: HttpClient, private _auth: AuthenticationService) {
    }

    getMyList() {
        return this.http.get<any>(BACKEND + `/users/${this._auth.getId()}/list`);
    }

    getList(user) {
        return this.http.get<any>(BACKEND + `/users/${user}/list`);
    }

    addToList(animeId, status) {
        return this.http.post<any>(BACKEND + `/users/${this._auth.getId()}/list`, {
            id: animeId,
            status: status
        });
    }

    updateList(animeId, status, watchedEpisodes) {
        return this.http.put<any>(BACKEND + `/users/${this._auth.getId()}/list/${animeId}`, {
            id: animeId,
            status: status,
            watchedEpisodes: watchedEpisodes
        });
    }

}
