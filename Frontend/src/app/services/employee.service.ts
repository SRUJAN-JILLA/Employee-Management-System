import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from '../classes/employee';
import {Observable} from 'rxjs';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8080/employees";
  constructor(private httpClient: HttpClient) {}

  addEmployee(employee: Employee): Observable<Object> {
    let url = "http://localhost:8080/employees/add";
    return this.httpClient.post(`${url}`,employee);
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

  
  getLoginAttempts(mail :string): Observable<number>{
    const url =  "http://localhost:8080/employees/loginAttempts";
    return this.httpClient.get<number>(`${url}/${mail}`);
  }

  setLoginAttempts(employee:Employee){
    const url =  "http://localhost:8080/employees/loginAttempts";
    return this.httpClient.put(`${url}`,  employee);
  }

  setLockTime(mail:string){
    const url = "http://localhost:8080/employees/lockTime";
    return this.httpClient.get(`${url}/${mail}`);
  }

  getLockTimeLeft(mail:string): Observable<number>{
    const url = "http://localhost:8080/employees/lockTimeLeft";
    return this.httpClient.get<number>(`${url}/${mail}`);
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

  changePassword(id: number, employee: Employee) {
    let url = "http://localhost:8080/employees/changePassword";
    return this.httpClient.put(`${url}/${id}`, employee);
  }

  changeActive(id: number, employee: Employee){
    let url = "http://localhost:8080/employees/changeActive";
    return this.httpClient.put(`${url}/${id}`, employee);
  }

  changeActiveByMail(mail: string, employee: Employee){
    let url = "http://localhost:8080/employees/changeActive/mail";
    return this.httpClient.put(`${url}/${mail}`, employee);
  }
}
