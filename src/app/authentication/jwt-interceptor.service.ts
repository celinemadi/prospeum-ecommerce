import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, delay, filter, switchMap, take, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {JwtService} from './jwt.service';
import {Router} from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

    retry = new BehaviorSubject(false);
    excludedUrls = [
        'login',
        'signup'
      ];
    constructor(private router: Router,
                private authService: AuthService,
                private jwtService: JwtService, private messageService: MessageService) {
    }

    private isRefreshing = false;

    private isValidRequestForInterceptor(requestUrl: string): boolean {
        let positionIndicator: string = 'v1/api/';
        let position = requestUrl.indexOf(positionIndicator);
        if (position > 0) {
          let destination: string = requestUrl.substr(position + positionIndicator.length);
          
          for (let address of this.excludedUrls) {
            if (new RegExp(address).test(destination)) {
              return false;
            }
          }
        }
        return true;
      }

  

    updateHttpTokenHeader(request) {
        const accessToken = this.jwtService.getAccessToken();
        if (this.isValidRequestForInterceptor(request.url)) {
            if (accessToken && request.headers.accessToken !== accessToken) {
                return request.clone({
                    headers: request.headers.set('Authorization',
                    accessToken)
                });
            } 
        }

        else {
            return request;
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<any>> {
            req = this.updateHttpTokenHeader(req);
            return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
                    if (error.status && error.status === 401) {
                        if (this.jwtService.getIsAccessTokenExpired()) {
                            const errorMessage = 'Session Expired Please Login Again.';
                            this.messageService.add({severity:'error', summary: 'Error', detail: 'Session Expired Please Login Again'});
                            delay(1000);
                            this.router.navigateByUrl('').then();
                            return throwError(new Error(errorMessage));
                        } else {
                            return throwError(error);
                        }
                    } 
                    else {
                        return throwError(error);
                    }
                })
            );

        
    }

}
