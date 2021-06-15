import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSigninComponent } from './auth-signin.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast'; import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';


import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Routes, RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
const routes: Routes = [
  {
    path: '',
    component: AuthSigninComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    CheckboxModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule,
    ProgressSpinnerModule,
    PasswordModule,
    MessageModule,
    MessagesModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [AuthSigninComponent]
})
export class AuthSigninModule { }
