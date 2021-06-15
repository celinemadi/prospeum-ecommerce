import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FlexModule } from '@angular/flex-layout';
import {ChipsModule} from 'primeng/chips';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { UserComponent } from './user-edit/user-form.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  }

];

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CardModule,
    ButtonModule,
    FlexModule,
    ChipsModule,
    ConfirmDialogModule,
    InputNumberModule,
    InputTextareaModule,
    ReactiveFormsModule
  ],
  providers: [ConfirmationService,UserService],
  bootstrap: [],
  exports: [UserComponent]
})
export class UserModule { }