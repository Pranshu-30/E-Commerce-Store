import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private apollo: Apollo) { }

  // Register User
  registerUser(userDetails: { email: string; name: string; password: string; avatar: string; role: string }): Observable<any> {
    const REGISTER_USER = gql`
      mutation addUser($data: CreateUserDto!) {
        addUser(data: $data) {
          id
          email
          name
          role
          avatar
          creationAt
          updatedAt
        }
      }
    `;

    // Prepare the user data with role and avatar (you can modify these fields as needed)
    const variables = {
      data: {
        email: userDetails.email,
        name: userDetails.name,
        password: userDetails.password,
        role: userDetails.role || 'customer',  // Default to 'customer' if role is not provided
        avatar: userDetails.avatar || 'https://example.com/avatar.jpg',      // Default to an empty string if avatar is not provided
      },
    };

    return this.apollo.mutate({
      mutation: REGISTER_USER,
      variables,
    });
  }

  // Login User
  loginUser(credentials: { email: string; password: string }): Observable<any> {
    const LOGIN_USER = gql`
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          access_token
          refresh_token
        }
      }
    `;

    return this.apollo.mutate({
      mutation: LOGIN_USER,
      variables: credentials,
    });
  }
}