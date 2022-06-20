import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '@ngrx/store';
import { resetPassword } from '../../state/auth';
import { AuthFormBasePage } from '../auth-form-base/auth-form-base.page';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage extends AuthFormBasePage implements OnInit {
  @ViewChild('phone') phoneNumber;

  ngOnInit() {
    super.ngOnInit();

    super.form = new FormGroup({
      username: new FormControl('', Validators.required),
    });
  }

  ionViewWillEnter() {
    super.ionViewWillEnter();
  }

  ionViewDidEnter() {
    this.focusOnPhoneNumber();
  }

  override getSubmitAction(): Action {
    const username = this.form.get('username').value;

    return resetPassword({ resetPasswordInput: { username } });
  }

  private focusOnPhoneNumber(): void {
    this.phoneNumber.setFocus();
  }
}
