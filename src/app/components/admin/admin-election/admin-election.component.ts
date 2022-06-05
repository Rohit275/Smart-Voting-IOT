import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-election',
  templateUrl: './admin-election.component.html',
  styleUrls: ['./admin-election.component.css'],
})
export class AdminElectionComponent implements OnInit {
  elections = [];
  private electionSub: Subscription;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'Name',
    'Description',
    'Date',
    'StartTime',
    'EndTime',
    'Status',
  ];
  constructor(private adminservice: AdminService) {}

  ngOnInit(): void {
    this.adminservice.getElection();
    this.electionSub = this.adminservice
      .getElectionUpdatedListener()
      .subscribe((data) => {
        console.log('admin election: ', data);
        this.elections = data;
        this.dataSource = new MatTableDataSource<any>(data);
      });
  }
}
