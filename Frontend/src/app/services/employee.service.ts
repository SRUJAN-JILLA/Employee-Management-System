import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from '../classes/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8080/employees";
  constructor(private httpClient: HttpClient) {}
  
  addEmployee(employee: Employee): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/add`, employee);
  }

  getEmployeesList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  updateEmployee(id: number, employee: Employee) {
    let url = "http://localhost:8080/employees/update";
    return this.httpClient.put(`${url}/${id}`, employee);
  }
  
  deleteEmployee(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  emailExists(email: String):Observable<boolean> {
    let url = "http://localhost:8080/employees/emailExists";
    return this.httpClient.get<boolean>(`${url}/${email}`)
  }
  
  download(type: String):Observable<Blob>{
    let url = "http://localhost:8080/employees/download";
    return this.httpClient.get(`${url}/${type}`, {responseType:'blob'});
  }

}
