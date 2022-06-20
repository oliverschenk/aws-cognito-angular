import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { confirmSignUp, resendConfirmationCode } from '../../state/auth';
import { AuthFormBasePage } from '../auth-form-base/auth-form-base.page';

@Component({
  selector: 'app-confirm-signup',
  templateUrl: './confirm-signup.page.html',
  styleUrls: ['./confirm-signup.page.scss'],
})
export class ConfirmSignupPage extends AuthFormBasePage implements OnInit {
  private username: string;

  constructor(router: Router, store: Store) {
    super(store);
    this.username = router.getCurrentNavigation().extras.state.username;
  }

  ngOnInit() {
    super.ngOnInit();

    super.form = new FormGroup({
      code: new FormControl('', Validators.required),
    });
  }

  ionViewWillEnter() {
    super.ionViewWillEnter();
  }

  getSubmitAction(): Action {
    const code = this.form.get('code').value;

    return confirmSignUp({
      confirmSignUpInput: {
        username: this.username,
        code,
      },
    });
  }

  async onResendCode() {
    this.store$.dispatch(
      resendConfirmationCode({
        resendConfirmationCodeInput: { username: this.username },
      })
    );
  }
}
