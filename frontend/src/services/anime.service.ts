import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Anime} from '../interfaces/anime';
import {Review} from '../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private http: HttpClient, private _auth: AuthService) {
  }

  getAnimes(PageSize: number, PageNumber: number, Search: string, SortType, SortOrder: string) {
    return this.http.get<any>(`https://localhost:3000/animes/?page=${PageNumber}&size=${PageSize}&search=${Search}&sort=${SortType}&order=${SortOrder}`);
  }

  getAnime(anime: string) {
    return this.http.get<any>(`https://localhost:3000/animes/${anime}`);
  }

  addAnime(anime) {
    // const image = imageUrl.split(',')[1];
    const postData = new FormData();
    postData.append('name', anime.name);
    postData.append('description', anime.description);
    postData.append('episodes', anime.episodes);
    postData.append('image', anime.image, anime.name);
    return this.http.post<{ id: string }>('https://localhost:3000/animes/', postData);
  }

  getReviews(anime: string) {
    return this.http.get<any>(`https://localhost:3000/animes/${anime}/reviews`);
  }

  postReview(anime: string, review: string) {
    return this.http.post<any>(`https://localhost:3000/animes/${anime}/reviews`, {review: review});
  }

  editReview(anime: string, reviewId: string, review) {
    return this.http.patch<any>(`https://localhost:3000/animes/${anime}/reviews/${reviewId}`, {review: review});
  }

  deleteReview(anime: string, reviewId: string) {
    return this.http.delete<any>(`https://localhost:3000/animes/${anime}/reviews/${reviewId}`);
  }

  upvote(anime: string, reviewId: string) {
    return this.http.post<{ upvotesCount: Number }>(`https://localhost:3000/animes/${anime}/reviews/${reviewId}/upvotes`, {});
  }

  unvote(anime: string, reviewId: string) {
    return this.http.delete<any>(`https://localhost:3000/animes/${anime}/reviews/${reviewId}/upvotes/${this._auth.getId()}`, {});
  }

  addRating(anime: string, rating: number) {
    return this.http.post<{ upvotesCount: Number }>(`https://localhost:3000/animes/${anime}/ratings`, {rating: rating});
  }

  changeRating(anime: string, ratingId: string, rating: number) {
    return this.http.put<{ upvotesCount: Number }>(`https://localhost:3000/animes/${anime}/ratings/${ratingId}`, {rating: rating});
  }

  getLatest() {
    return this.http.get<any>('https://localhost:3000/animes/latest');
  }

}
