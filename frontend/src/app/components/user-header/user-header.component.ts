import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MessagesService} from '../../services/messages.service';
import {ProfileService} from '../../services/profile.service';
import {Router, RouterEvent} from '@angular/router';
import {debounce, filter} from 'rxjs/operators';
import {timer} from 'rxjs';

@Component({
    selector: 'app-user-header',
    templateUrl: './user-header.component.html',
    styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit, OnDestroy {

    routerEvents;
    friendRequests = [];
    nfriendRequests = 0;
    nMessages = 0;

    constructor(private _router: Router, public _auth: AuthService, private _messages: MessagesService,
                private _profile: ProfileService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon('friends',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/friends-24px.svg'));
    }

    ngOnInit() {
        this.routerEvents = this._router.events
            .pipe(filter(e => this._auth.loggedIn() && (e instanceof RouterEvent)))
            .pipe(debounce(() => timer(1000)));
        this.routerEvents.subscribe(() => {
            this._profile.getFriendRequests().subscribe(res => {
                this.friendRequests = res;
                this.nfriendRequests = res.length;
            });
            this._messages.getMessagesCount().subscribe(res => this.nMessages = res.count);
        });
    }

    ngOnDestroy() {
        this.routerEvents.unsubscribe();
    }

    acceptFriend(fr) {
        return this._profile.addFriend(fr._id).subscribe(() => {
            const index = this.friendRequests.indexOf(fr);
            this.friendRequests.splice(index, 1);
            this.nfriendRequests--;
        });
    }
}
