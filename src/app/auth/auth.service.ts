import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelFBSubscriptions();
        // save state
        this.isAuthenticated = false;
        // notify app
        this.store.dispatch(new Auth.SetAuthenticated());
        // redirect user
        this.router.navigate(['/login']);
      }
    });
  }


  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .createUserWithEmailAndPassword(
        authData.email,
        authData.password
      ).then(result => {
        this.store.dispatch(new UI.StopLoading());
      }).catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(
        authData.email,
        authData.password,
      ).then(result => {
        this.store.dispatch(new UI.StopLoading());
      }).catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.store.dispatch(new Auth.SetUnauthenticated());
  }

  // todo: remove
  isAuth() {
    return this.isAuthenticated;
  }
}
