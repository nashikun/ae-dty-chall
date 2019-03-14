import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors = {MAX_ATTEMPTS: false, WRONG_CREDITENTIALS: false};

  constructor(private _auth: AuthenticationService, private _router: Router, private fb: FormBuilder) {
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
