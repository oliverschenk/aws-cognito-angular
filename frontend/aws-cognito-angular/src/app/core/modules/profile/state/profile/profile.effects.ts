import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, exhaustMap } from 'rxjs/operators';
import { of, from } from 'rxjs';

import {
  loadUserProfile,
  userProfileLoadFailed,
  userProfileLoaded,
  saveUserProfile,
  userProfileSaved,
  userProfileSaveFailed,
} from './profile.actions';

import { ProfileService } from '../../services';
import { UserProfile } from './profile.models';
import { showSuccessNotification } from '../page';

@Injectable()
export class ProfileEffects {
  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserProfile),
      exhaustMap(() =>
        from(this.profileService.getUserProfile()).pipe(
          map((profile: UserProfile) => userProfileLoaded({ profile })),
          catchError((error) =>
            of(userProfileLoadFailed({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  saveUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveUserProfile),
      map((action) => action.profile),
      exhaustMap((profile) =>
        from(this.profileService.updateUserProfile(profile)).pipe(
          map(() => userProfileSaved({ profile })),
          catchError((error) =>
            of(userProfileSaveFailed({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  userProfileSavedSuccessfully$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileSaved),
      map(() => showSuccessNotification({ message: 'Profile updated' }))
    )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}
}
