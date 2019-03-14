import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {CookieService} from "ngx-cookie-service";

const BACKEND = environment.backend;

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient, private _router: Router, private cookieService: CookieService) {
    }

    public username = '';

    usernameExists(email) {
        return this.http.head<any>(BACKEND + `/users/emails/${email}`);
    }

    registerUser(user) {
        return this.http.post<any>(BACKEND + `/auth/signup`, user).pipe(tap(res => {
            localStorage.setItem('id', res.id);
            localStorage.setItem('role', res.role);
            this.cookieService.set('jwt', res.token, 12 * 60 * 60);
            localStorage.setItem('token', res.token);
            return res;
        }));
    }

    loginUser(user) {
        return this.http.post<any>(BACKEND + '/auth/login', user).pipe(tap(res => {
            localStorage.setItem('id', res.id);
            localStorage.setItem('role', res.role);
            this.cookieService.set('jwt', res.token, 12 * 60 * 60);
            localStorage.setItem('token', res.token);
            return res;
        }));
    }


    loginSocial(provider: string, token: string) {
        console.log(BACKEND + '/auth/' + provider + '/token');
        return this.http.post<any>(BACKEND + '/auth/' + provider + '/token', {access_token: token})
            .pipe(tap((res: any) => {
                console.log(res.token);
                localStorage.setItem('id', res.id);
                localStorage.setItem('role', res.role);
                this.cookieService.set('jwt', res.token, 12 * 60 * 60);
                localStorage.setItem('token', res.token);
                return res;
            }));
    }

    verifyUser(Url) {
        return this.http.post<any>(BACKEND + `/auth/verify/${Url}`, {}).pipe(tap((res: any) => {
            console.log(res.token);
            localStorage.setItem('id', res.id);
            localStorage.setItem('role', res.role);
            this.cookieService.set('jwt', res.token, 12 * 60 * 60);
            localStorage.setItem('token', res.token);
            return res;
        }));
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
