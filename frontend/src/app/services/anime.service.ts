import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {environment} from 'src/environments/environment';
import {Anime} from 'src/app/interfaces/anime';
import {Review} from "../interfaces/review";


const BACKEND = environment.backend;

@Injectable({
    providedIn: 'root'
})
export class AnimeService {

    constructor(private http: HttpClient, private _auth: AuthenticationService) {
    }

    getAnimes(PageSize: Number, PageNumber: Number, Search: string, SortType: string, SortOrder: string) {
        return this.http.get<{ animes: Anime[], count: number }>(BACKEND + `/animes/?page=${PageNumber}&size=${PageSize}&search=${Search}&sort=${SortType}&order=${SortOrder}`);
    }

    getAnime(animeId: string) {
        return this.http.get<Anime>(BACKEND + `/animes/${animeId}`);
    }

    animeExists(animeId: string) {
        return this.http.head<{ exists: string } | null>(BACKEND + `/animes/${animeId}`);
    }

    addAnime(anime: Anime) {
        // const image = imageUrl.split(',')[1];
        const postData = new FormData();
        postData.append('name', anime.name);
        postData.append('description', anime.description);
        postData.append('episodes', anime.episodes);
        postData.append('image', anime.image, anime.name);
        return this.http.post<{ id: string }>(BACKEND + '/animes', postData);
    }

    getReviews(animeId: string) {
        return this.http.get<{ reviews: Review[], userReview: Review }>(BACKEND + `/animes/${animeId}/reviews`);
    }

    postReview(animeId: string, review: Review) {
        return this.http.post<Review>(BACKEND + `/animes/${animeId}/reviews`, {review: review});
    }

    editReview(animeId: string, reviewId: string, review: Review) {
        return this.http.patch<Review>(BACKEND + `/animes/${animeId}/reviews/${reviewId}`, {review: review});
    }

    deleteReview(animeId: string, reviewId: string) {
        return this.http.delete<null>(BACKEND + `/animes/${animeId}/reviews/${reviewId}`);
    }

    upvote(animeId: string, reviewId: string) {
        return this.http.post<{ upvotesCount: string }>(BACKEND + `/animes/${animeId}/reviews/${reviewId}/upvotes`, {});
    }

    unvote(animeId: string, reviewId: string) {
        return this.http.delete<{ upvotesCount: string }>(BACKEND + `/animes/${animeId}/reviews/${reviewId}/upvotes/${this._auth.getId()}`);
    }

    addRating(animeId: string, rating: string) {
        return this.http.post<{ _id: string }>(BACKEND + `/animes/${animeId}/ratings`, {rating: rating});
    }

    changeRating(animeId: string, ratingId: string, rating: string) {
        return this.http.put<null>(BACKEND + `/animes/${animeId}/ratings/${ratingId}`, {rating: rating});
    }

    getLatest() {
        return this.http.get<Anime[]>(BACKEND + '/animes/latest');
    }

}
