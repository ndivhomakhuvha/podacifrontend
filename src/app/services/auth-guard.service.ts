import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/otp']);
      return false;
    }
    this.router.navigate(['/otp']);
    return true;
  }
}
