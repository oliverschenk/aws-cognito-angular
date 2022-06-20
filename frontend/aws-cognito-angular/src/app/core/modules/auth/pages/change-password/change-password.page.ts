import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '@ngrx/store';
import { matchValidator } from 'src/app/shared/form-validator';
import { changePassword } from '../../state/auth';
import { AuthFormBasePage } from '../auth-form-base/auth-form-base.page';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage extends AuthFormBasePage implements OnInit {
  public toastState$;

  ionViewWillEnter() {
    super.ionViewWillEnter();
  }

  ngOnInit(): void {
    super.ngOnInit();

    super.form = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        matchValidator('confirmPassword', true),
      ]),
      confirmNewPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        matchValidator('newPassword'),
      ]),
    });
  }

  override getSubmitAction(): Action {
    const currentPassword = this.form.get('currentPassword').value;
    const newPassword = this.form.get('newPassword').value;

    return changePassword({
      changePasswordInput: { currentPassword, newPassword },
    });
  }
}
