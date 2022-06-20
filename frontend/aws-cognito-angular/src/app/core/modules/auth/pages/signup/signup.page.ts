import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from '@ngrx/store';
import { matchValidator } from 'src/app/shared/form-validator';
import { signUp } from '../../state/auth';
import { AuthFormBasePage } from '../auth-form-base/auth-form-base.page';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage extends AuthFormBasePage implements OnInit {
  @ViewChild('phone') phoneNumber;

  numberRegEx = /^\+[1-9]\d{1,14}$/;

  ngOnInit() {
    super.ngOnInit();

    super.form = new FormGroup({
      phone: new FormControl('', {
        validators: [Validators.required, Validators.pattern(this.numberRegEx)],
        updateOn: 'blur',
      }),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        matchValidator('confirmPassword', true),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        matchValidator('password'),
      ]),
      name: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  ionViewWillEnter() {
    super.ionViewWillEnter();
  }

  ionViewDidEnter() {
    this.focusOnPhoneNumber();
  }

  override getSubmitAction(): Action {
    const signUpInput = {
      username: this.form.get('phone').value,
      password: this.form.get('password').value,
      name: this.form.get('name').value,
      company: this.form.get('company').value,
      role: this.form.get('role').value,
    };

    return signUp({ signUpInput });
  }

  private focusOnPhoneNumber(): void {
    this.phoneNumber.setFocus();
  }
}
