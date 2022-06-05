import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiURL + '/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  users = [];
  userOTPVerifyListener = new BehaviorSubject<any>('');

  public currentOTP = new Subject<any>();
  public currentUser = new BehaviorSubject<any>('');

  otp: Number;

  currentUserListener() {
    return this.currentUser;
  }

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
      .post<{ message: string; user: any }>(BACKEND_URL + '/register', {
        user: User,
      })
      .subscribe((result) => {
        console.log('Result', result);
        this.userOTPVerifyListener.next(result.user);
      });
  }

  sendOTP(email) {
    this.http
      .post<{ message: string; otp: any; result: any }>(
        BACKEND_URL + 'sendOTP',
        { username: email }
      )
      .subscribe(
        (userData) => {
          // this.users = userData.user;
          console.log('User Data in service: ', userData);
          // this.currentOTP = userData.otp;
          this.currentOTP.next(userData.otp);
          let username = userData.result[0].Name;
          this.currentUser.next(username);
          this.otp = userData.otp;
          // console.log('User Data in service: ', this.users);
          // this.router.navigate(['/user/dashboard']);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  loginUser(username, password) {
    if (password === this.otp) {
      this.router.navigate(['/user/dashboard']);
    }
  }
}
