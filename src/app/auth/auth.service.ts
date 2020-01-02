import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  // true - authenticated
  authChange = new Subject<boolean>();

  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth) { }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(
        authData.email,
        authData.password
      ).then(result => {
        this.authSuccessfully();
      }).catch(e => {
        console.error(e);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(
        authData.email,
        authData.password,
      ).then(result => {
        this.authSuccessfully();
      }).catch(e => {
        console.error(e);
      });
  }

  logout() {
    // save state
    this.isAuthenticated = false;
    // notify app
    this.authChange.next(false);
    // redirect user
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
