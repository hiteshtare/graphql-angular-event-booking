import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public graphQLApiUrl = 'http://localhost:4700/graphql';

  constructor() { }

  login(email: string, password: string) {
    const requestBody = {
      query: `query{
            login(email:"${email}",password:"${password}") {
              userId
              token
              tokenExpiration
            }
        }`
    };

    return fetch(this.graphQLApiUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      // if (res.status !== 200 && res.status !== 201) {
      //   throw new Error('Failed!');
      // }

      return res.json();
    }).catch((err) => {
      console.log(err);
    });
  }

  createUser(email: string, password: string) {
    const requestBody = {
      query: `mutation{
            createUser(userInput:{email:"${email}",password:"${password}"}) {
              _id,
              email
            }
        }`
    };

    return fetch(this.graphQLApiUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      // if (res.status !== 200 && res.status !== 201) {
      //   throw new Error('Failed!');
      // }

      return res.json();
    }).catch((err) => {
      console.log(err);
    });
  }
}
