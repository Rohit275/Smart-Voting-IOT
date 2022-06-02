import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './auth/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { OtpVerifyComponent } from './auth/otp-verify/otp-verify.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { AdminSensorComponent } from './components/admin/admin-sensor/admin-sensor.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    OtpVerifyComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    AdminSensorComponent,
    UserDashboardComponent,
    LoginComponent,
    LoginLayoutComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
