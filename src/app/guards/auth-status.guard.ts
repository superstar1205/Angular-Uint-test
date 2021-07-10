import { Injectable } from '@angular/core'
import { CanActivate, CanLoad, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { ReadAuthCookie } from '../shared/cookie'

@Injectable({
  providedIn: 'root',
})
export class AuthStatusGuard implements CanActivate {
  private authStatus: any;

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('id_token');
    this.authStatus = token;
    if (this.authStatus) {
      this.router.navigateByUrl('dashboard/app-list');
      return true;
    } else {
      this.router.navigateByUrl('/auth');
      return false;
    }
  }
}
