import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../services/employee';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

export interface Employee {
  id?: number;
  name: string;
  role: string;
  department: string;
  email: string;
}

@Component({
  selector: 'app-employee-list',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {

  employees = signal<Employee[]>([])
  isEditMode = signal(false);
  editingId = signal<number | null>(null);
  empService = inject(EmployeeService);

  fb = inject(FormBuilder);

  employeeForm = this.fb.group({
    name: new FormControl(''),
    role: new FormControl(''),
    department: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
  }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getEmployees().subscribe((data) => {
      this.employees.set(data);
    });
  }

  addEmployee() {
    const newEmployee: Employee = this.employeeForm.value as Employee;
    if (this.editingId() === null) {
      this.empService.addEmployee(newEmployee).subscribe((employee) => {
        console.log(employee);
        console.log(newEmployee);
        this.employees.update((employees) => [...employees, employee]);
        this.resetForm();
      });
    } else {
      this.empService.updateEmployee(this.editingId()!, newEmployee).subscribe((updatedEmployee) => {
        this.employees.update((employees) =>
          employees.map((emp) => (emp.id === this.editingId() ? updatedEmployee : emp))
        );
        this.resetForm();
      });
    }

  }

  resetForm() {
    this.employeeForm.reset();
    this.isEditMode.set(false);
    this.editingId.set(null);
  }

  /** Called when Edit button is clicked */
  setEditData(id: number, emp: any) {
    this.isEditMode.set(true);
    this.editingId.set(id);

    this.employeeForm.patchValue({
      name: emp.name,
      role: emp.role,
      department: emp.department,
      email: emp.email
    });
  }

  deleteEmployee(id: number) {
    this.empService.deleteEmployee(id).subscribe(() => {
      this.employees.update((employees) =>
        employees.filter((emp) => emp.id !== id)
      );
    });
  }
}
