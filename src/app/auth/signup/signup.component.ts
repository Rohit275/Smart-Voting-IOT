import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {
    console.log('OnRegister click')

    console.log(form.value)
    if(form.valid && form.value.password == form.value.confirmPassword) {
      this.authService.register(form.value);
    }
  }

}
