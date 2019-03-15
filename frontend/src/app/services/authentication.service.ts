import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

const BACKEND = environment.backend;

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient, private _router: Router,) {
    }

    public username = '';

    save_creds = function (res) {
        localStorage.setItem('id', res.id);
        localStorage.setItem('role', res.role);
        localStorage.setItem('token', res.token);
        return res;
    };

    usernameExists(email) {
        return this.http.head<any>(BACKEND + `/users/emails/${email}`);
    }

    registerUser(user) {
        return this.http.post<any>(BACKEND + `/auth/signup`, user).pipe(tap(res => this.save_creds(res)));
    }

    loginUser(user) {
        return this.http.post<any>(BACKEND + '/auth/login', user).pipe(tap(res => this.save_creds(res)));
    }


    loginSocial(provider: string, token: string) {
        console.log(BACKEND + '/auth/' + provider + '/token');
        return this.http.post<any>(BACKEND + '/auth/' + provider + '/token', {access_token: token})
            .pipe(tap(res => this.save_creds(res)));
    }

    verifyUser(Url) {
        return this.http.post<any>(BACKEND + `/auth/verify/${Url}`, {}).pipe(tap(res => this.save_creds(res)));
    }

    logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        this.http.post<any>(BACKEND + '/auth/logout', {}).subscribe(() => {
            this._router.navigate(['/']);
        });
    };

    isAdmin = () => localStorage.getItem('role') === 'admin';

    loggedIn = () => !!localStorage.getItem('token');

    getId = () => localStorage.getItem('id');

    getToken = () => localStorage.getItem('token');

}
