import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.css']
})

export class VerificationComponent implements OnInit {

    userId: string;
    Url: string = '';
    username: string = '';
    show: boolean = false;
    errors = {};
    verified: boolean = false;

    constructor(private _auth: AuthenticationService, private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.Url = this._activatedRoute.snapshot.paramMap.get('Url');
        this._auth.verifyUser(this.Url).subscribe(id => {
            this.userId = id.id;
            this.show = true;
        });
    }

    saveUsername() {
        this._auth.addUsername(this.userId, this.Url, this.username).subscribe(res => {
            if (res.success) {
                this.verified = true;
                this.show = false;
            }
        }, err => {
            this.errors = err.error;
        });
    }

}

/*
* () => {
      this._router.navigate([`/animelist`]);
    }*/
