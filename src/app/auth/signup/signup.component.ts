import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { OtpVerifyComponent } from '../otp-verify/otp-verify.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {
    console.log('OnRegister click')

    console.log(form.value)
    if(form.valid && form.value.password == form.value.confirmPassword) {
      this.authService.register(form.value);
    }


  }

  verifyOTP() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    this.dialog.open(OtpVerifyComponent, dialogConfig);
  }

}
