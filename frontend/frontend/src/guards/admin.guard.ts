import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {
  }

  canActivate(): boolean {
    if (this._auth.isAdmin()) {
      return true;
    } else {
      this._router.navigate(['/']);
      return false;
    }
  }
}
