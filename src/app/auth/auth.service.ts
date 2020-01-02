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

  private user: User = null;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth) { }

  private authSuccessfully() {
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
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user !== null;
  }
}
