import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

const BACKEND_URL_USER = environment.apiURL + '/users';
const BACKEND_URL_SEMSOR = environment.apiURL + '/sensors';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  sensors: any = [];
  elections: any = [];
  private sensorUpdated = new Subject<any[]>();
  private electionUpdated = new Subject<any[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getSensor() {
    this.http
      .get<{ message: string; category: any }>(
        BACKEND_URL_SEMSOR + '/getSensor'
      )
      .pipe(
        map((cat) => {
          // console.log(cat.category);
          return cat.category;
        })
      )
      .subscribe((data) => {
        // console.log(`Category fetched: ${data}`);
        // console.log('Category fetched: ', data);
        this.sensors = data;
        this.sensorUpdated.next([...this.sensors]);
        console.log('Sensors :', this.sensors);
      });
  }

  getSensorUpdateListener() {
    return this.sensorUpdated.asObservable();
  }

  getElection() {
    this.http
      .get<{ message: string; category: any }>(
        BACKEND_URL_USER + '/getElection'
      )
      .pipe(
        map((cat) => {
          // console.log(cat.category);
          return cat.category;
        })
      )
      .subscribe((data) => {
        // console.log(`Category fetched: ${data}`);
        // console.log('Category fetched: ', data);
        this.elections = data;
        this.electionUpdated.next([...this.elections]);
        console.log('elections :', this.elections);
      });
  }

  getElectionUpdatedListener() {
    return this.electionUpdated.asObservable();
  }

  UpdateSensor(id, status) {
    // var id = this.componentService.currentId;
    this.http
      .put<{ message: string; user: any }>(
        BACKEND_URL_SEMSOR + '/updateSensor/' + id,
        { status: status }
      )
      .subscribe(() => {
        //this.viewService.users.forms = Form;
        //this.viewComponent.ngOnInit();
        console.log('Sensor Value Updated Successfully!');
        setTimeout(() => {
          this.getSensor();
        });
        // this.router.navigate(['/user', id, 'view']);
      });
  }
}
