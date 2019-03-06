import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private http: HttpClient, private _auth: AuthService) {
  }

  private _animesUrl = 'https://localhost:3000/animes/';

  getAnimes(PageSize, PageNumber, Search, SortType, SortOrder) {
    return this.http.get<any>(`https://localhost:3000/animes/?page=${PageNumber}&size=${PageSize}&search=${Search}&sort=${SortType}&order=${SortOrder}`);
  }

  getAnime(anime) {
    return this.http.get<any>(`https://localhost:3000/animes/${anime}`);
  }

  addAnime(anime) {
    // const image = imageUrl.split(',')[1];
    const postData = new FormData();
    postData.append('name', anime.name);
    postData.append('description', anime.description);
    postData.append('episodes', anime.episodes);
    postData.append('image', anime.image, anime.name);
    return this.http.post<any>(this._animesUrl, postData);
  }

  getReviews(anime) {
    return this.http.get<any>(`https://localhost:3000/animes/${anime}/reviews`);
  }

  postReview(anime, review) {
    return this.http.post<any>(`https://localhost:3000/animes/${anime}/reviews`, {review: review});
  }

  editReview(anime, reviewId, review) {
    return this.http.patch<any>(`https://localhost:3000/animes/${anime}/reviews/${reviewId}`, {review: review});
  }

  deleteReview(anime, reviewId) {
    return this.http.delete<any>(`https://localhost:3000/animes/${anime}/reviews/${reviewId}`);
  }

  upvote(anime, reviewId) {
    return this.http.post<any>(`https://localhost:3000/animes/${anime}/reviews/${reviewId}/upvotes`, {});
  }

  unvote(anime, reviewId) {
    return this.http.delete<any>(`https://localhost:3000/animes/${anime}/reviews/${reviewId}/upvotes/${this._auth.getId()}`, {});
  }

  addRating(anime, rating) {
    return this.http.post<any>(`https://localhost:3000/animes/${anime}/ratings`, {rating: rating});
  }

  changeRating(anime, ratingId, rating) {
    return this.http.put<any>(`https://localhost:3000/animes/${anime}/ratings/${ratingId}`, {rating: rating});
  }

  getLatest() {
    return this.http.get<any>('https://localhost:3000/animes/latest');
  }

}
