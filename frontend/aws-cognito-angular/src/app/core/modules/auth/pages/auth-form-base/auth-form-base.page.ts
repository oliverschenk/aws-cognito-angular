import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PageState, resetPageState, selectPageState } from '../../state/page';

@Component({ template: '' })
export abstract class AuthFormBasePage implements OnInit {
  public pageState$: Observable<PageState>;
  public submitAttempt: boolean;

  protected form: FormGroup;

  constructor(protected store$: Store) {}

  ngOnInit() {
    this.pageState$ = this.store$.select(selectPageState);
  }

  ionViewWillEnter() {
    this.submitAttempt = false;
    this.form.reset();
    this.store$.dispatch(resetPageState());
  }

  onSubmitForm() {
    this.submitAttempt = true;

    if (this.form.valid) {
      this.store$.dispatch(this.getSubmitAction());
    }
  }

  abstract getSubmitAction(): Action;
}
