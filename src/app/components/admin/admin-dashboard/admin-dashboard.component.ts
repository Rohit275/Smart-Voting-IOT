import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  totalSensor: number = 5;
  activeSensor: number = 10;

  leadingContestant = { name: 'Modi Ji', id: 'AZX124' };

  contestantlist = [
    { name: 'Modi Ji', votes: 12 },
    { name: 'Cras justo odio', votes: 3 },
    { name: 'Cras justo', votes: 9 },
    { name: 'Cras odio', votes: 7 },
    { name: 'Crasdio', votes: 8 },
  ];

  constructor() {}

  ngOnInit(): void {}
}
