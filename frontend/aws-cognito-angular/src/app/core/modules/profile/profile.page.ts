import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { signOut } from 'src/app/core/modules/auth/state/auth';
import { UserProfile } from './state/profile';

import { loadUserProfile } from './state/profile/profile.actions';

import {
  selectProfileIsLoaded,
  selectUserProfile,
} from './state/profile/profile.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user$: Observable<UserProfile>;
  profileLoaded$: Observable<boolean>;

  constructor(private store$: Store) {}

  ngOnInit() {
    this.user$ = this.store$.select(selectUserProfile);
    this.profileLoaded$ = this.store$.select(selectProfileIsLoaded);
  }

  ionViewWillEnter() {
    this.store$.dispatch(loadUserProfile());
  }

  onSignout() {
    this.store$.dispatch(signOut());
  }
}
