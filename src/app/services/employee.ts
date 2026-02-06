import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from '../ems/feature/employee-list/employee-list';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http=inject(HttpClient);
  baseUrl = 'http://localhost:3000/employees';

  getEmployees() {
    return this.http.get<Employee[]>(this.baseUrl);
  }
  
  addEmployee(employee: Employee) {
    return this.http.post<Employee>(this.baseUrl, employee);
  } 

  updateEmployee(id: number, employee: Employee) {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
