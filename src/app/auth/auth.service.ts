import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // Name: "Sample name"
  // confirmPassword: "asas"
  // email: "sample@gmail.com"
  // password: "asa"
  // phone: "1234567890"
  // username: "Sample username"
  register(user) {
    let User = {
      name: user.Name,
      email: user.email,
      username: user.username,
      phone: user.phone,
      password: user.password
    }

    // console.log('User in Auth service: ', JSON.stringify(User))

    this.http.post<{message: string}>(
      'http://localhost:3000/api/users/register',
      { user: User }).subscribe((result) => {
        console.log('Result', result.message);
    })
  }
}
