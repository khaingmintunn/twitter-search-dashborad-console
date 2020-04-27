import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from '../app/pages/home/home.component';
import { LoginComponent } from '../app/pages/login/login.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "user", component: UserComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent = [
  HomeComponent,
  LoginComponent
];
