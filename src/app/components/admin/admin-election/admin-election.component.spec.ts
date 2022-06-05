import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminElectionComponent } from './admin-election.component';

describe('AdminElectionComponent', () => {
  let component: AdminElectionComponent;
  let fixture: ComponentFixture<AdminElectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminElectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
