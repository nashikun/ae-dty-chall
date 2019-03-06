import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.router.navigate(['/page-not-found']);
          }
          if (error.status == 401) {
            this.router.navigate(['/login']);
          }
          return throwError(error);
        }));
  }
}
