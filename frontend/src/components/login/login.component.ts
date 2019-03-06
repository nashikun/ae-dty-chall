import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors = {};

  constructor(private _auth: AuthService, private _router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.pattern('(?=.*[0-9]+)(?=.*[a-z]+)(?=.*[A-Z]+).{6,20}$')
        ]
      })
    });
  }

  loginUser() {
    this._auth.loginUser(this.loginForm.value).subscribe(() => {
      this._router.navigate([`/profile/animelist`]);
      }, err => {
        this.errors = err.error;
      }
    );
  }
}
