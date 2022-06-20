import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { matchValidator } from 'src/app/shared/form-validator';
import { confirmResetPassword, resetPassword } from '../../state/auth';
import { AuthFormBasePage } from '../auth-form-base/auth-form-base.page';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.page.html',
  styleUrls: ['./confirm-password.page.scss'],
})
export class ConfirmPasswordPage extends AuthFormBasePage implements OnInit {
  public toastState$;
  private username: string;

  constructor(router: Router, store: Store) {
    super(store);
    this.username = router.getCurrentNavigation().extras.state.username;
  }

  ngOnInit() {
    super.ngOnInit();

    super.form = new FormGroup({
      code: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        matchValidator('confirmPassword', true),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        matchValidator('password'),
      ]),
    });
  }

  ionViewWillEnter() {
    super.ionViewWillEnter();
  }

  override getSubmitAction(): Action {
    const code = this.form.get('code').value;
    const password = this.form.get('password').value;

    return confirmResetPassword({
      confirmPasswordResetInput: {
        username: this.username,
        code,
        password,
      },
    });
  }

  async onResendResetCode() {
    this.store$.dispatch(
      resetPassword({ resetPasswordInput: { username: this.username } })
    );
  }
}
