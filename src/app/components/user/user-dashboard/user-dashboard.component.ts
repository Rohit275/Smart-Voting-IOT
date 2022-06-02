import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  votingstatus = 'pending';
  name = 'Dubakur';

  displayedColumns: string[] = ['id', 'name', 'age', 'address'];

  dataSource = [
    {
      id: 'AXZ1123',
      name: 'Modi Ji',
      age: 92,
      address: 'Dubai kurukku sandhu',
    },
    {
      id: 'AXZ1124',
      name: 'Donald trump',
      age: 90,
      address: 'vellai maazhigai',
    },
    { id: 'AXZ1125', name: 'EPS', age: 92, address: 'Mental hospital kilpauk' },
    {
      id: 'AXZ1137',
      name: 'Sasikala',
      age: 92,
      address: 'Bangalore Central Jail',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
