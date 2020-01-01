import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  // true - authenticated
  authChange = new Subject<boolean>();

  private user: User = null;

  constructor(private router: Router) {

  }

  // saves user state
  // emits auth change event
  // navigates to routing link
  private setUser(user: User) {
    this.user = user;
    const isAuth = user !== null;
    this.authChange.next(isAuth);
    if (isAuth) {
      this.router.navigate(['/training']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  registerUser(authData: AuthData) {
    this.setUser({
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    });
  }

  login(authData: AuthData) {
    this.setUser({
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    });
  }

  logout() {
    this.setUser(null);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user !== null;
  }
}
