/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ISignUpResult, signUp, signUpSuccessful } from '.';
import { AuthService } from '../../services';
import { showSuccessNotification } from '../page';

import {
  loadAuthenticatedState,
  authenticatedStateLoaded,
  signOut,
  signedOut,
  signIn,
  signInSuccessful,
  signInFailed,
  signUpFailed,
  resetPassword,
  resetPasswordSuccessful,
  resetPasswordFailed,
  changePasswordSuccessful,
  changePassword,
  changePasswordFailed,
  confirmSignUp,
  confirmSignUpSuccessful,
  confirmResetPasswordFailed,
  confirmResetPassword,
  confirmResetPasswordSuccessful,
  confirmSignUpFailed,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  loadAuthenticatedState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAuthenticatedState),
      exhaustMap(() =>
        from(this.authService.getCurrentUser()).pipe(
          map((cognitoUser) =>
            authenticatedStateLoaded({ isLoggedIn: cognitoUser !== null })
          ),
          catchError(() => of(authenticatedStateLoaded({ isLoggedIn: false })))
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      map((action) => action.signInInput),
      exhaustMap((signInInput) =>
        from(
          this.authService.signIn(signInInput.username, signInInput.password)
        ).pipe(
          map(() => signInSuccessful()),
          catchError((err) => {
            let errorMessage = '';
            if (err.name === 'NotAuthorizedException') {
              errorMessage = err.message;
            } else {
              errorMessage = 'Something went wrong. Please try again later.';
            }
            return of(signInFailed({ errorMessage }));
          })
        )
      )
    )
  );

  signInSuccessful$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInSuccessful),
        map(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      map((action) => action.signUpInput),
      exhaustMap((signUpInput) => {
        const attributes = {
          name: signUpInput.name,
          'custom:company': signUpInput.company,
          'custom:role_name': signUpInput.role,
          phone_number: signUpInput.username,
        };
        return from(
          this.authService.signUp(
            signUpInput.username,
            signUpInput.password,
            attributes
          )
        ).pipe(
          map((result: ISignUpResult) =>
            signUpSuccessful({ username: result.user.getUsername() })
          ),
          catchError((err) => {
            let errorMessage = '';
            if (err.name === 'UsernameExistsException') {
              errorMessage =
                'The given phone number has already been registered.';
            } else {
              errorMessage = 'Something went wrong. Please try again later.';
            }
            return of(signUpFailed({ errorMessage }));
          })
        );
      })
    )
  );

  signUpSuccessful$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signUpSuccessful),
        map((action) => action.username),
        map((username) =>
          this.router.navigate(['/auth/confirm-signup'], {
            state: { username },
          })
        )
      ),
    { dispatch: false }
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      exhaustMap(() =>
        from(this.authService.signOut()).pipe(map(() => signedOut()))
      )
    )
  );

  signedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signedOut),
        map(() => this.router.navigate(['/auth/signin']))
      ),
    { dispatch: false }
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changePassword),
      map((action) => action.changePasswordInput),
      exhaustMap((changePasswordInput) =>
        from(
          this.authService.changePassword(
            changePasswordInput.currentPassword,
            changePasswordInput.newPassword
          )
        ).pipe(
          map(() => changePasswordSuccessful()),
          catchError((err) =>
            of(changePasswordFailed({ errorMessage: err.message }))
          )
        )
      )
    )
  );

  passwordChangeSuccessful$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changePasswordSuccessful),
      map(() =>
        showSuccessNotification({
          message: 'Password has been updated',
        })
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPassword),
      map((action) => action.resetPasswordInput),
      exhaustMap((resetPasswordInput) =>
        from(this.authService.resetPassword(resetPasswordInput.username)).pipe(
          map(() =>
            resetPasswordSuccessful({ username: resetPasswordInput.username })
          ),
          catchError((err) => {
            let errorMessage = '';
            if (err.name === 'LimitExceededException') {
              errorMessage = err.message;
            } else {
              errorMessage = 'Something went wrong. Please try again later.';
            }
            return of(resetPasswordFailed({ errorMessage }));
          })
        )
      )
    )
  );

  passwordResetSuccessful$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(resetPasswordSuccessful),
        map((action) => action.username),
        map((username) => {
          this.router.navigate(['/auth/confirm-password'], {
            state: { username },
          });
        })
      ),
    { dispatch: false }
  );

  confirmPasswordReset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmResetPassword),
      map((action) => action.confirmPasswordResetInput),
      exhaustMap((confirmPasswordResetInput) =>
        from(
          this.authService.confirmPassword(
            confirmPasswordResetInput.username,
            confirmPasswordResetInput.code,
            confirmPasswordResetInput.password
          )
        ).pipe(
          map(() => confirmResetPasswordSuccessful()),
          catchError((err) => {
            const errorMessage = err.Message;
            return of(confirmResetPasswordFailed({ errorMessage }));
          })
        )
      )
    )
  );

  confirmPasswordResetSuccessful$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(confirmResetPasswordSuccessful),
        map(() => this.router.navigate(['/auth/signin']))
      ),
    { dispatch: false }
  );

  confirmSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmSignUp),
      map((action) => action.confirmSignUpInput),
      exhaustMap((confirmSignUpInput) =>
        from(
          this.authService.confirmSignUp(
            confirmSignUpInput.username,
            confirmSignUpInput.code
          )
        ).pipe(
          map(() => confirmSignUpSuccessful()),
          catchError((err) => {
            const errorMessage = err.Message;
            return of(confirmSignUpFailed({ errorMessage }));
          })
        )
      )
    )
  );

  confirmSignUpSuccessful$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(confirmSignUpSuccessful),
        map(() => this.router.navigate(['/auth/signin']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}
}
