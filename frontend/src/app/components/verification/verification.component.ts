import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from "../../services/profile.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.css']
})

export class VerificationComponent implements OnInit {

    url: string = '';
    username: string = '';
    errors = {};
    show: boolean = false;

    constructor(private profile: ProfileService, private _activatedRoute: ActivatedRoute, private router: Router, private auth: AuthenticationService) {
    }

    ngOnInit() {
        this.url = this._activatedRoute.snapshot.paramMap.get('url');
        if (this.url) {
            this.auth.verifyUser(this.url).subscribe(res => {
                this.show = true;
                this.username = res.username;
            });
        } else {
            this._activatedRoute.queryParams.subscribe(params => {
                this.username = params.username;
                this.show = true;
            })
        }
    }

    saveUsername() {
        this.profile.changeUsername(this.username).subscribe(() => {
            this.router.navigate(['/']);
        }, err => {
            this.errors = err.error;
        });
    }

}
