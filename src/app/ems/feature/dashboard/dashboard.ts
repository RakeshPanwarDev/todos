import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../services/employee';
import { RouterLink } from "@angular/router";
import { LeaveService } from '../../../services/leave-service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  employees=signal([]);
  leaves=signal([]);

  empService=inject(EmployeeService);
  leaveService=inject(LeaveService);
  constructor() {}

  ngOnInit() {
    this.empService.getEmployees().subscribe((data:any)=>{
      this.employees.set(data);
    });
    this.leaveService.getLeaves().subscribe((data:any)=>{
      this.leaves.set(data);
    });

  }

}
