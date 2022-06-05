import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public hide: boolean = true;

  currentShift = 'admin';
  isAdmin: boolean = false;
  isSubmit: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = false;
  }

  userClick() {
    if (this.isAdmin) {
      this.isAdmin = false;
      this.currentShift = 'admin';
      this.isSubmit = false;
    } else {
      this.isAdmin = true;
      this.currentShift = 'user';
    }

    console.log(
      'isAdmin: ' + this.isAdmin + 'currentShift: ' + this.currentShift
    );
  }

  onNext(form: NgForm) {
    this.isSubmit = true;
    console.log('On next');
    this.authService.sendOTP(form.value.userName);
  }

  onLogin(form: NgForm) {
    if (this.isAdmin) {
      console.log(form.value);
      console.log('Admin');
      if (form.value.password == 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        console.log('Incorrect password!');
      }
    } else {
      console.log('On Login');
      console.log(form.value);
      this.authService.loginUser(form.value.userName, form.value.password);

      console.log('normal');
    }
  }
}
