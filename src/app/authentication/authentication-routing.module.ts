import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/sign-in',
        pathMatch: 'full'
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./auth-signup/auth-signup.module').then(m => m.AuthSignupModule)
      },
      {
        path: 'sign-in',
        loadChildren: () => import('./auth-signin/auth-signin.module').then(m => m.AuthSigninModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
