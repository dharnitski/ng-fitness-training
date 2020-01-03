import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import * as fromApp from '../app.reducer';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  // true - authenticated
  authChange = new Subject<boolean>();

  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<{ ui: fromApp.State }>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelFBSubscriptions();
        // save state
        this.isAuthenticated = false;
        // notify app
        this.authChange.next(false);
        // redirect user
        this.router.navigate(['/login']);
      }
    });
  }


  registerUser(authData: AuthData) {
    this.store.dispatch({type: 'START_LOADING'});
    this.afAuth.auth
      .createUserWithEmailAndPassword(
        authData.email,
        authData.password
      ).then(result => {
        this.store.dispatch({type: 'STOP_LOADING'});
        this.uiService.loadingStateChanged.next(false);
      }).catch(error => {
        this.store.dispatch({type: 'STOP_LOADING'});
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch({type: 'START_LOADING'});
    this.afAuth.auth
      .signInWithEmailAndPassword(
        authData.email,
        authData.password,
      ).then(result => {
        this.store.dispatch({type: 'STOP_LOADING'});
      }).catch(error => {
        this.store.dispatch({type: 'STOP_LOADING'});
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
