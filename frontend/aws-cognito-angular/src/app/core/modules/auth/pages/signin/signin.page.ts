import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '@ngrx/store';
import { signIn } from '../../state/auth';
import { AuthFormBasePage } from '../auth-form-base/auth-form-base.page';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage extends AuthFormBasePage implements OnInit {
  @ViewChild('phone') phoneNumber;

  numberRegEx = /^\+[1-9]\d{1,14}$/;

  ngOnInit() {
    super.ngOnInit();

    super.form = new FormGroup({
      phone: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.numberRegEx)],
        updateOn: 'blur',
      }),
      password: new FormControl('', Validators.required),
    });
  }

  ionViewWillEnter() {
    super.ionViewWillEnter();
  }

  ionViewDidEnter() {
    this.focusOnPhoneNumber();
  }

  override getSubmitAction(): Action {
    const username = this.form.get('phone').value;
    const password = this.form.get('password').value;

    return signIn({ signInInput: { username, password } });
  }

  private focusOnPhoneNumber(): void {
    this.phoneNumber.setFocus();
  }
}
