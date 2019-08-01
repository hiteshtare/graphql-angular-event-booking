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

  constructor(public formBuilder: FormBuilder) {
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

    const requestBody = {
      query: `query{
            login(email:"${email}",password:"${password}") {
              userId
              token
              tokenExpiration
            }
        }`
    };

    fetch('http://localhost:4700/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }

      return res.json();
    }).catch((err) => {
      console.log(err);
    });
  }

  signUp(formValue) {
    const email = formValue.email;
    const password = formValue.password;

    const requestBody = {
      query: `mutation{
            createUser(userInput:{email:"${email}",password:"${password}"}) {
              _id,
              email
            }
        }`
    };

    fetch('http://localhost:4700/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }

      return res.json();
    }).catch((err) => {
      console.log(err);
    });
  }
}
