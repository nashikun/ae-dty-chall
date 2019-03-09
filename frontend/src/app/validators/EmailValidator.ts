import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AbstractControl} from "@angular/forms";
import { of, timer} from "rxjs";
import {catchError, mapTo, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class EmailValidator {

  constructor(private _auth: AuthService) {
  }

  available(control: AbstractControl) {
    return timer(1000).pipe(switchMap(()=>{
      return this._auth.usernameExists(control.value)
          .pipe(mapTo({exists: true}))
          .pipe(catchError(()=>of(null)));
    }));
  }
}
