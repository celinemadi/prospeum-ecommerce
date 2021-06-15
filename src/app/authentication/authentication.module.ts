import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FlexModule } from '@angular/flex-layout';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FlexModule,
    PasswordModule

  ],
  providers:[MessageService]
})
export class AuthenticationModule { }
