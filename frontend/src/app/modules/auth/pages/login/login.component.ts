import { UserDataService } from './../../../../shared/services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginErrorMessage: string;
  public loginError: boolean;

  constructor(public formBuilder: FormBuilder, public userDataService: UserDataService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login(formValue) {
    const email = formValue.email;
    const password = formValue.password;

    this.userDataService.login(email, password).then((res) => {
      if (!res['data']) {
        alert(res.errors[0].message);
      } else {
        this.clearFields();
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  signUp(formValue) {
    const email = formValue.email;
    const password = formValue.password;

    this.userDataService.createUser(email, password).then((res) => {
      if (res['errors']) {
        alert(res.errors[0].message);
      } else {
        this.clearFields();
      }

    }).catch((err) => {
      console.error(err);
    });
  }

  clearFields() {
    this.loginForm.reset();
  }
}
