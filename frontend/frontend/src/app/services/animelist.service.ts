import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnimelistService {

  constructor(private http: HttpClient, private _auth: AuthService) {
  }

  getMyList() {
    return this.http.get<any>(`https://localhost:3000/users/${this._auth.getId()}/list`);
  }

  getList(user) {
    return this.http.get<any>(`https://localhost:3000/users/${user}/list`);
  }

  addToList(animeId, status) {
    return this.http.post<any>(`https://localhost:3000/users/${this._auth.getId()}/list`, {
      id: animeId,
      status: status
    });
  }

  updateList(animeId, status, watchedEpisodes) {
    return this.http.put<any>(`https://localhost:3000/users/${this._auth.getId()}/list/${animeId}`, {
      id: animeId,
      status: status,
      watchedEpisodes: watchedEpisodes
    });
  }

}
