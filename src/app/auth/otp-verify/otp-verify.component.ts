import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.css']
})
export class OtpVerifyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onVerifyOTP(form: NgForm) {
    // console.log("onVerifyOTP")
    console.log("OTP: ", form.value)
  }

}
