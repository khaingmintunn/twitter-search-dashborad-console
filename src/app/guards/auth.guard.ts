import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardService } from '../service/dashboard.service';
import { User } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: User;
  constructor(
    private dashboardSerevice: DashboardService,
    private router: Router
  ) {
    this.dashboardSerevice.authUser$
      .subscribe((data) => {
        this.user = JSON.parse(data);
      });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.dashboardSerevice.isLoggedIn();
    if (!this.user) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
