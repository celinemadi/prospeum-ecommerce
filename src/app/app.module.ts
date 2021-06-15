import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { FlexModule } from '@angular/flex-layout';
import { ProgressModule } from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService as Authguard } from './authentication/auth-guard.service';
import { MainComponent } from './main/main.component';
import { JwtInterceptorService } from './authentication/jwt-interceptor.service';
import { MessageService } from 'primeng/api';
import { ProductService } from './main/product/services/product.service';

const routes = [

  {
    path: '',
    redirectTo: '/main/products',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },


  {
    path: 'main',
    component: MainComponent,
    canActivate: [Authguard],

    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  },];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ProgressModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexModule,
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [MessageService,ProductService,    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
