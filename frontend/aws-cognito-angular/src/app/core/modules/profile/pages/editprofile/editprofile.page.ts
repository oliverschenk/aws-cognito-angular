import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectUserProfile } from '../../state/profile/profile.selectors';
import { saveUserProfile } from '../../state/profile/profile.actions';
import { UserProfile } from '../../state/profile';
import { PageState, resetPageState, selectPageState } from '../../state/page';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  public pageState$: Observable<PageState>;
  public submitAttempt: boolean;

  profileForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private store$: Store) {
    this.pageState$ = this.store$.select(selectPageState);
  }

  get errorControl() {
    return this.profileForm.controls;
  }

  ngOnInit() {
    this.submitAttempt = false;

    this.profileForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });

    this.store$
      .select(selectUserProfile)
      .pipe(take(1))
      .subscribe((profile: UserProfile) => {
        this.profileForm.patchValue(profile);
      });
  }

  ionViewWillEnter() {
    this.store$.dispatch(resetPageState());
  }

  submitForm() {
    this.submitAttempt = true;

    if (this.profileForm.valid) {
      this.store$.dispatch(
        saveUserProfile({ profile: this.profileForm.value })
      );
    }
  }
}
