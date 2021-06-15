import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import { debounceTime, distinctUntilChanged, filter, startWith, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TokenResponse } from '../models/token-response';
import { JwtService } from '../jwt.service';
import { Subject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['../authentication.scss','./auth-signup.component.scss',]
})
export class AuthSignupComponent implements OnInit {
    MustMatchError = false;
    constructor(private router: Router, private authService: AuthService, private jwtService:JwtService,private messageService: MessageService) {
    }
    userform: FormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', [Validators.required,])
    }, {validators: [this.MustMatch('password', 'password_confirmation')]});
  


    hidePassword = true;
    hideConfirmationPassword = true;
    submitInProgress = false;


    ngOnInit() {
    }

    MustMatch(controlName: string, matchingControlName: string) {
      this.MustMatchError = false
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return null;
            }

            if (control.value !== matchingControl.value) {
                this.MustMatchError = true
                matchingControl.setErrors({mustMatch: true});
            } else {
                matchingControl.setErrors(null);
            }
        };
    }

    register() {
        this.submitInProgress = true;
        this.authService.register(this.userform.value).subscribe(res => {
          this.messageService.add({severity:'success', summary: 'Hooray!', detail: 'Registration successfull.'});
            let form = this.userform.value
            var user = {email: form.email,password:form.password}
            this.authService.login(user).subscribe((res: TokenResponse | any) => {
              this.jwtService.saveTokens(res);
              this.submitInProgress = false;
              this.router.navigateByUrl('/products');
              }, error => {
              this.submitInProgress = false;
  
          });

            this.submitInProgress = false;
        }, error => {
            this.submitInProgress = false;
            this.messageService.add({severity:'error', summary: 'Error', detail: error.error.error});
        });
    }
    onReject() {
      this.messageService.clear('c');
  }
  
  clear() {
      this.messageService.clear();
  }
}
