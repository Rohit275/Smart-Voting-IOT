import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  users = [];
  userOTPVerifyListener = new BehaviorSubject<any>('');

  currentUserUpdateListner() {
    // return this.currentCategoryUpdated.asObservable();
    return this.userOTPVerifyListener;
  }

  register(user) {
    let User = {
      name: user.Name,
      email: user.email,
      username: user.username,
      phone: user.phone,
      password: user.password,
    };

    // console.log('User in Auth service: ', JSON.stringify(User))

    this.http
      .post<{ message: string; user: any }>(
        'http://localhost:3000/api/users/register',
        { user: User }
      )
      .subscribe((result) => {
        console.log('Result', result);
        this.userOTPVerifyListener.next(result.user);
      });
  }

  loginUser(username, password) {
    this.http
      .post<{ message: string; user: any }>(
        'http://localhost:3000/api/users/login',
        { username: username, password: password }
      )
      .pipe(
        map((data) => {
          return data;
        })
      )
      .subscribe(
        (userData) => {
          this.users = userData.user;
          console.log('User Data in service: ', userData);
          console.log('User Data in service: ', this.users);
          this.router.navigate(['/user/dashboard']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
