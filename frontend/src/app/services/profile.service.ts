import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../environments/environment';

const BACKEND = environment.backend;

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private http: HttpClient, private _auth: AuthenticationService) {
    }

    getUsers(PageSize, PageNumber, Search, SortType, SortOrder) {
        return this.http.get<any>(BACKEND + `/users/?page=${PageNumber}&size=${PageSize}&search=${Search}&sort=${SortType}&order=${SortOrder}`);
    }

    getProfile(userId) {
        return this.http.get<any>(BACKEND + `/users/${userId}/profile`);
    }

    getMyProfile() {
        return this.http.get<any>(BACKEND + `/users/${this._auth.getId()}/profile`);
    }

    changePicture(picture) {
        const pictureData = new FormData();
        pictureData.append('picture', picture);
        return this.http.put<any>(BACKEND + `/users/${this._auth.getId()}/profile/picture`, pictureData);
    }

    changeUsername(username) {
        return this.http.put<any>(BACKEND + `/users/${this._auth.getId()}/profile/username`, {username: username});
    }

    getUsername(userId) {
        return this.http.get<any>(BACKEND + `/users/${userId}/profile/username`);
    }

    updateProfile(profile) {
        return this.http.put<any>(BACKEND + `/users/${this._auth.getId()}/profile/bio`, profile);
    }

    addFriend(friend) {
        return this.http.post<any>(BACKEND + `/users/${this._auth.getId()}/profile/friends`, {friend: friend});
    }

    banUser(user) {
        return this.http.post<any>(BACKEND + `/users/${user}/ban`, {});
    }

    getFriendRequests() {
        return this.http.get<any>(BACKEND + `/users/${this._auth.getId()}/profile/friends/requested`);
    }
}
