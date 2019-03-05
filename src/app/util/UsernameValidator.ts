import {FormControl} from '@angular/forms';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class UsernameValidator {

  timer: any;

  constructor(private _auth: AuthService) {
  }

  available(control: FormControl) {

    clearTimeout(this.timer);

    return new Promise(resolve => {

      this.timer = setTimeout(() => {

        this._auth.existingUser(control.value).subscribe((res) => {
          if (res.exists) {
            resolve({'username exists': true});
          } else {
            resolve(null);
          }
        }, (err) => console.error(err));

      }, 1000);

    });
  }

}
