import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {Message} from "../interfaces/message";

const BACKEND = environment.backend;

@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    constructor(private http: HttpClient, private _auth: AuthService) {
    }

    sendMessage(userId: string, message: Message) {
        return this.http.post<{ id: string }>(BACKEND + `/users/${userId}/profile/messages`, message);
    }

    getMessagesCount() {
        return this.http.get<{ count: number }>(BACKEND + `/users/${this._auth.getId()}/profile/messages/unread-count`);
    }

    getSentMails(PageSize, PageNumber) {
        return this.http.get<{ sent: Message[], sentCount: number }>(BACKEND + `/users/${this._auth.getId()}/profile/messages/sent?page=${PageNumber}&size=${PageSize}`);
    }

    getReceivedMails(PageSize, PageNumber) {
        return this.http.get<{ received: Message[], receivedCount: number }>(BACKEND + `/users/${this._auth.getId()}/profile/messages/received?page=${PageNumber}&size=${PageSize}`);
    }

    getMail(messageId: string) {
        return this.http.get<Message>(BACKEND + `/users/${this._auth.getId()}/profile/messages/${messageId}`);
    }

    markMailRead(messageId: string) {
        return this.http.post<null>(BACKEND + `/users/${this._auth.getId()}/profile/messages/${messageId}/set-read`, {});
    }
}
