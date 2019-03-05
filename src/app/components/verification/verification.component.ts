import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})

export class VerificationComponent implements OnInit {

  userId;
  Url = '';
  username = '';
  show = false;
  errors = {};
  verified = false;

  constructor(private _auth: AuthService, private _activatedRoute: ActivatedRoute) {
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
