import { GlobalService } from './../../../../shared/services/global.service';
import { CustomToastService } from './../../../../shared/services/custom-toast.service';
import { UserDataService } from './../../../../shared/services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginErrorMessage: string;
  public loginError: boolean;

  constructor(public _formBuilder: FormBuilder, public userDataService: UserDataService,
    public customToastService: CustomToastService, public globalService: GlobalService) {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login(formValue) {
    const email = formValue.email;
    const password = formValue.password;

    this.globalService.loaderMessage = 'Logging In...';
    this.globalService.showSpinner();
    this.userDataService.login(email, password).then((res) => {
      if (!res['data']) {
        this.customToastService.toastMessage('error', 'Validation Error!', res.errors[0].message);
      } else {
        this.customToastService.toastMessage('success', 'Login Success!', '');
        this.clearFields();
      }
      this.globalService.hideSpinner();
    }).catch((err) => {
      console.error(err);
    });
  }

  signUp(formValue) {
    const email = formValue.email;
    const password = formValue.password;

    this.globalService.loaderMessage = 'Signing Up...';
    this.globalService.showSpinner();
    this.userDataService.createUser(email, password).then((res) => {
      if (res['errors']) {
        this.customToastService.toastMessage('error', 'Validation Error!', res.errors[0].message);
      } else {
        this.customToastService.toastMessage('success', 'Signup Success!', '');
        this.clearFields();
      }
      this.globalService.hideSpinner();
    }).catch((err) => {
      console.error(err);
    });
  }

  clearFields() {
    this.loginForm.reset();
  }
}
