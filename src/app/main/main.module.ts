import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProductService } from './product/services/product.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
    ]
  }
];

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MenubarModule,
    DialogModule,
    ButtonModule,
  ],
  providers:[ProductService],
  bootstrap: [],
})
export class MainModule { }