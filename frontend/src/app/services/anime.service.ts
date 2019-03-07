import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from 'src/environments/environment';

const BACKEND = environment.backend;

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private http: HttpClient, private _auth: AuthService) {
  }

  getAnimes(PageSize, PageNumber, Search, SortType, SortOrder) {
    return this.http.get<any>(BACKEND+`/animes/?page=${PageNumber}&size=${PageSize}&search=${Search}&sort=${SortType}&order=${SortOrder}`);
  }

  getAnime(anime) {
    return this.http.get<any>(BACKEND+`/animes/${anime}`);
  }

  addAnime(anime) {
    // const image = imageUrl.split(',')[1];
    const postData = new FormData();
    postData.append('name', anime.name);
    postData.append('description', anime.description);
    postData.append('episodes', anime.episodes);
    postData.append('image', anime.image, anime.name);
    return this.http.post<any>(BACKEND+'/animes', postData);
  }

  getReviews(anime) {
    return this.http.get<any>(BACKEND+`/animes/${anime}/reviews`);
  }

  postReview(anime, review) {
    return this.http.post<any>(BACKEND+`/animes/${anime}/reviews`, {review: review});
  }

  editReview(anime, reviewId, review) {
    return this.http.patch<any>(BACKEND+`/animes/${anime}/reviews/${reviewId}`, {review: review});
  }

  deleteReview(anime, reviewId) {
    return this.http.delete<any>(BACKEND+`/animes/${anime}/reviews/${reviewId}`);
  }

  upvote(anime, reviewId) {
    return this.http.post<any>(BACKEND+`/animes/${anime}/reviews/${reviewId}/upvotes`, {});
  }

  unvote(anime, reviewId) {
    return this.http.delete<any>(BACKEND+`/animes/${anime}/reviews/${reviewId}/upvotes/${this._auth.getId()}`, {});
  }

  addRating(anime, rating) {
    return this.http.post<any>(BACKEND+`/animes/${anime}/ratings`, {rating: rating});
  }

  changeRating(anime, ratingId, rating) {
    return this.http.put<any>(BACKEND+`/animes/${anime}/ratings/${ratingId}`, {rating: rating});
  }

  getLatest() {
    return this.http.get<any>(BACKEND+'/animes/latest');
  }

}
