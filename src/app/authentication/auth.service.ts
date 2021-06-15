import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { LoginCredentials } from './models/login-credentials';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { JwtService } from './jwt.service';
import { RegistrationRequest } from './models/registration-request';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    refreshTokenTimeout;
    isRefreshingToken = false;

    baseUrl = environment.baseURL;
    loginUrl = this.baseUrl + '/api/login';
    registerUrl = this.baseUrl + '/api/signup';

    constructor(private http: HttpClient,
        private router: Router, private jwtService: JwtService) {
    }

    public login(user: LoginCredentials) {
        return (this.http.post(this.loginUrl, user, { headers: { 'Content-Type': 'application/json' } }))
            .pipe(map(res => {
                return res;
            }));
    }



    public register(registrationRequest: RegistrationRequest) {
        return this.http.post(this.registerUrl, registrationRequest, { headers: { 'Content-Type': 'application/json' } });

    }



}
