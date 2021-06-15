import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {JwtService} from '../jwt.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { TokenResponse } from '../models/token-response';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['../authentication.scss','./auth-signin.component.scss'],

})
export class AuthSigninComponent implements OnInit {

    constructor(private router: Router, 
                private authService: AuthService,
                private jwtService: JwtService,
                private messageService: MessageService) {
    }

    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', Validators.required)
    });

    hidePassword = true;
    submitInProgress = false;
    isCredentialsInvalid = false;

    ngOnInit() {
        this.loginForm.valueChanges.subscribe(val => {
            this.isCredentialsInvalid = false;
        });
    }


    login() {
        this.submitInProgress = true;
        this.authService.login(this.loginForm.value).pipe(switchMap(x => of(x))).subscribe((res: TokenResponse | any) => {
            this.isCredentialsInvalid = false;
            this.jwtService.saveTokens(res);
            this.submitInProgress = false;
            this.router.navigateByUrl('/main/products');
        }, error => {
            console.log(error)
            this.isCredentialsInvalid = true;
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid email or password'});
            this.submitInProgress = false;

        });
    }
    onReject() {
        this.messageService.clear();
    }
    
    clear() {
        this.messageService.clear();
    }
}
