import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {JwtService} from './jwt.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,
                private jwtService: JwtService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.isLoggedIn()) {
            this.router.navigateByUrl('/auth/sign-in').then();
            return false;
        }
        return true;
    }

    public isLoggedIn() {
        return (this.jwtService.getIsAuthenticated() && !(this.jwtService.getIsAccessTokenExpired()));

    }
}
