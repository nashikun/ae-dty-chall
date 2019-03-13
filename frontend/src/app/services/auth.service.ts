import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

const BACKEND = environment.backend;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private _router: Router) {
    }

    options = {withCredentials: true};
    public username = '';

    usernameExists(email) {
        return this.http.head<any>(BACKEND + `/users/emails/${email}`);
    }

    registerUser(user) {
        return this.http.post<any>(BACKEND + `/users`, user);
    }

    loginUser(user) {
        //return this.http.get<any>(BACKEND + '/auth/login', {withCredentials: true});
        return this.http.post<any>(BACKEND + '/auth/login', user).pipe(tap(res => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('id', res.id);
            localStorage.setItem('role', res.role);
            return res;
        }));
    }

    verifyUser(Url) {
        return this.http.get<any>(BACKEND + `/users/verify/${Url}`);
    }

    addUsername(userId, url, username) {
        return this.http.post<any>(BACKEND + `/users/${userId}/profile/username`, {url: url, username: username});
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

    loggedIn = () => !!localStorage.getItem('id');

    getToken = () => localStorage.getItem('token');

    getId = () => localStorage.getItem('id');

}
