import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  votingstatus = 'pending';
  name = '';

  displayedColumns: string[] = ['name', 'party'];
  dataSource: MatTableDataSource<any>;


  // dataSource = [
  //   {
  //     id: 'AXZ1123',
  //     name: 'Modi Ji',
  //     age: 92,
  //     address: 'Dubai kurukku sandhu',
  //   },
  //   {
  //     id: 'AXZ1124',
  //     name: 'Donald trump',
  //     age: 90,
  //     address: 'vellai maazhigai',
  //   },
  //   { id: 'AXZ1125', name: 'EPS', age: 92, address: 'Mental hospital kilpauk' },
  //   {
  //     id: 'AXZ1137',
  //     name: 'Sasikala',
  //     age: 92,
  //     address: 'Bangalore Central Jail',
  //   },
  // ];

  constructor(private service: AuthService) {}

  user: String;
  private userSub: Subscription;

  ngOnInit(): void {
    this.service.currentUserListener().subscribe((username) => {
      console.log('username in us-ds', username);
      this.name = username;
    });
  }
}
