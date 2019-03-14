import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './services/authentication.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        const authService = this.injector.get(AuthenticationService);
        const tokenizedRequest = req.clone({setHeaders: {Authorization: `Bearer ${authService.getToken()}`}});
        return next.handle(tokenizedRequest)
    }
}
