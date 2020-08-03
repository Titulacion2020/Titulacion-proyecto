import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'new-account',
    loadChildren: () => import('./pages/new-account/new-account.module').then( m => m.NewAccountPageModule),
  },
  {
    path: 'rest-password',
    loadChildren: () => import('./pages/rest-password/rest-password.module').then( m => m.RestPasswordPageModule),
  },
  {
    path: 'menuP',
    loadChildren: () => import('./pages/paciente/menu-p/menu-p.module').then( m => m.MenuPPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'menuO',
    loadChildren: () => import('./pages/odontologo/menu-o/menu-o.module').then( m => m.MenuOPageModule),
    canActivate: [AuthGuard]
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
