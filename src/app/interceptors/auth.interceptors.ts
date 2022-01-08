import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
        const cloneRequest = req.clone({
            headers
        });
        return next.handle(cloneRequest).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    window.location.href = '/login';
                    return throwError(error.error);
                }
            })
        );
    }
}