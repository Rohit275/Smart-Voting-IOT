import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-admin-sensor',
  templateUrl: './admin-sensor.component.html',
  styleUrls: ['./admin-sensor.component.css'],
})
export class AdminSensorComponent implements OnInit {
  sensors = [];
  private sensorSub: Subscription;

  constructor(private adminservice: AdminService) {}

  ngOnInit(): void {
    this.adminservice.getSensor();
    this.sensorSub = this.adminservice
      .getSensorUpdateListener()
      .subscribe((data) => {
        console.log('admin sensor: ', data);
        this.sensors = data;
      });
    // console.log(this.sensors);
  }

  onClickDiv(id, status) {
    if (status == 'On') {
      status = 'Off';
    } else if (status == 'Off') {
      status = 'On';
    }
    console.log(status, id);
    this.adminservice.UpdateSensor(id, status);
  }
}
