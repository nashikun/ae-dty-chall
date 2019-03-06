import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private _auth: AuthService) {
  }

  getProfile(userId) {
    return this.http.get<any>(`https://localhost:3000/users/${userId}/profile`);
  }

  getMyProfile() {
    return this.http.get<any>(`https://localhost:3000/users/${this._auth.getId()}/profile`);
  }

  changePicture(picture) {
    const pictureData = new FormData();
    pictureData.append('picture', picture);
    return this.http.put<any>(`https://localhost:3000/users/${this._auth.getId()}/profile/picture`, pictureData);
  }

  changeUsername(username) {
    return this.http.put<any>(`https://localhost:3000/users/${this._auth.getId()}/profile/username`, {username: username});
  }

  getUsername(userId) {
    return this.http.get<any>(`https://localhost:3000/users/${userId}/profile/username`);
  }

  updateProfile(profile) {
    return this.http.put<any>(`https://localhost:3000/users/${this._auth.getId()}/profile/bio`, profile);
  }

  addFriend(friend) {
    return this.http.post<any>(`https://localhost:3000/users/${this._auth.getId()}/profile/friends`, {friend: friend});
  }

  getFriendRequests() {
    return this.http.get<any>(`https://localhost:3000/users/${this._auth.getId()}/profile/friends/requested`);
  }

  sendMessage(userId, message) {
    return this.http.post<any>(`https://localhost:3000/users/${userId}/profile/messages`, message);
  }

  getMessagesCount() {
    return this.http.get<any>(`https://localhost:3000/users/${this._auth.getId()}/profile/messages/unread-count`);
  }

  getSentMails(PageSize, PageNumber) {
    return this.http.get<any>(`https://localhost:3000/users/${this._auth.getId()}/profile/messages/sent?page=${PageNumber}&size=${PageSize}`);
  }

  getReceivedMails(PageSize, PageNumber) {
    return this.http.get<any>(`https://localhost:3000/users/${this._auth.getId()}/profile/messages/received?page=${PageNumber}&size=${PageSize}`);
  }

  getMail(messageId) {
    return this.http.get<any>(`https://localhost:3000/users/${this._auth.getId()}/profile/messages/${messageId}`);
  }

  markMailRead(messageId) {
    return this.http.post<any>(`https://localhost:3000/users/${this._auth.getId()}/profile/messages/${messageId}/set-read`, {});
  }

}
