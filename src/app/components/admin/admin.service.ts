import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  sensors: any = [];
  private sensorUpdated = new Subject<any[]>();
  constructor(private http: HttpClient, private router: Router) {}

  getSensor() {
    this.http
      .get<{ message: string; category: any }>(
        'http://localhost:3000/api/sensors/getSensor'
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

  UpdateSensor(id, status) {
    // var id = this.componentService.currentId;
    this.http
      .put<{ message: string; user: any }>(
        'http://localhost:3000/api/sensors/updateSensor/' + id,
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
