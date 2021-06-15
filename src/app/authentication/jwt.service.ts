import {Injectable} from '@angular/core';
import {ParsedToken} from './models/parsed-token';
import {TokenResponse} from './models/token-response';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class JwtService {
    constructor() {
    }

    parseToken(token: string): ParsedToken {
        let payload;
        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    getUser(){
        return (this.parseToken(this.getAccessToken()));
    }
    getName() {
        return (this.parseToken(this.getAccessToken()).firstname);
    }

    getEmail() {
        return (this.parseToken(this.getAccessToken()).email);
    }

    getRole() {
        return (this.parseToken(this.getAccessToken()).role);
    }
    getIsAuthenticated() {
        return this.getAccessToken() !== null && this.getAccessToken() !== '';
    }

    getIsAccessTokenExpired() {
        return (this.getAccessTokenRemainingTime() <= 0);
    }


    saveTokens(tokens: TokenResponse) {
        localStorage.setItem('access_token', tokens.token);
    }

    clearTokens() {
        localStorage.removeItem('access_token');
    }

    getAccessTokenRemainingTime() {
        return ((this.parseToken(this.getAccessToken()).exp * 1000) - Date.now());
    }


    getAccessToken() {
        return localStorage.getItem('access_token');
    }

  

}
