import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _router: Router) {
  }

  public username = '';

  existingUser(user) {
    return this.http.get<any>(`https://localhost:3000/users/${user}`);
  }

  registerUser(user) {
    return this.http.post<any>(`https://localhost:3000/users`, user);
  }

  loginUser(user) {
    return this.http.post<any>('https://localhost:3000/users/login', user).pipe(tap(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('id', res.id);
      localStorage.setItem('role', res.role);
      return res;
    }));
  }

  verifyUser(Url) {
    return this.http.get<any>(`https://localhost:3000/users/verify/${Url}`);
  }

  addUsername(userId, url, username) {
    return this.http.post<any>(`https://localhost:3000/users/${userId}/profile/username`, {url: url, username: username});
  }

  logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    this._router.navigate(['/']);
  };

  isAdmin = () => localStorage.getItem('role') === 'admin';

  loggedIn = () => !!localStorage.getItem('token');

  getToken = () => localStorage.getItem('token');

  getId = () => localStorage.getItem('id');

}
