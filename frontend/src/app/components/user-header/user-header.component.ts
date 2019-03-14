import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MessagesService} from '../../services/messages.service';
import {ProfileService} from '../../services/profile.service';
import {Router, RouterEvent} from '@angular/router';
import {debounce, filter} from 'rxjs/operators';
import {timer} from 'rxjs';
import {AuthService} from "angularx-social-login";

@Component({
    selector: 'app-user-header',
    templateUrl: './user-header.component.html',
    styleUrls: ['./user-header.component.css'],
    providers: [AuthService]
})
export class UserHeaderComponent implements OnInit, OnDestroy {

    routerEvents;
    friendRequests = [];
    nfriendRequests = 0;
    nMessages = 0;

    constructor(private _router: Router, public _auth: AuthenticationService, private _messages: MessagesService,
                private authService: AuthService, private _profile: ProfileService,
                private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon('friends',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/friends-24px.svg'));
    }

    ngOnInit() {
        // get messages and request on load and recheck on each page change, at most once per second
        this._profile.getFriendRequests().subscribe(res => {
            this.friendRequests = res;
            this.nfriendRequests = res.length;
        });
        this._messages.getMessagesCount().subscribe(res => this.nMessages = res.count);
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

    logout() {
        this._auth.logOut();
        this.authService.signOut().catch(err => console.error(err));
    }
}
