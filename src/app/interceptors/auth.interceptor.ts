import {Observable} from 'rxjs/Observable';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem('id_token');
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization',
                    'Bearer ' + idToken)
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
