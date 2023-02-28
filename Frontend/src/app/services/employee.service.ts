import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from '../classes/employee';
import { Observable } from 'rxjs';
import { Subject } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL : string | undefined;
  private subscription: any;

  constructor(private httpClient: HttpClient) { 
    this.baseURL = environment.baseURL;
   }

 	/* Should subscribe from server to form connection SSE */
  subscribe(): Subject<any> {
    let eventSource = new EventSource(environment.subscribeUrl);

    let subscription = new Subject();
    eventSource.addEventListener("notifications", event => {
      subscription.next(event);
    });
    this.subscription = subscription;
    return subscription;
  }

  /* Should return subscription to components */
  getSubscription() {
    return this.subscription;
  }

  /* Should add an employee */
  addEmployee(employee: Employee,
    adminName: string, adminId: number): Observable<Object> {
    let url = environment.addEmployeeUrl;
    return this.httpClient.post(`${url}/${adminName}/${adminId}`, employee);
  }

  /* Should return all employees */
  getEmployeesList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  /* Should update employee based on id */
  updateEmployee(id: number,
    employee: Employee,
    adminName: string,
    adminId: number,
    employeeName: string) {
    let url = environment.updateEmployeeUrl;
    return this.httpClient.put(`${url}/${id}/${adminName}/${adminId}/${employeeName}`, employee);
  }

  /* Should delete employee based on id */
  deleteEmployee(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  /* Should update the notifications after delete */
  getNotificationsAfterDelete(
    adminName: string,
    adminId: number,
    employeeIds: number[]
  ): Observable<Object> {
    let url = environment.getNotificationsAfterDeleteUrl;
    return this.httpClient.put(`${url}/${adminName}/${adminId}`, employeeIds);
  }

  /* Should return notifications based on id */
  getNotifications(id: number): Observable<string[]> {
    let url = environment.getNotificationUrl;
    return this.httpClient.get<string[]>(`${url}/${id}`);
  }

  /* Should delete notifications based on id */
  deleteNotifications(id: number) {
    let url = environment.deleteNotificationUrl;
    return this.httpClient.delete(`${url}/${id}`);
  }

  /* Should return login attempts based on mail */
  getLoginAttempts(mail: string): Observable<number> {
    const url = environment.loginAttemptsUrl;
    return this.httpClient.get<number>(`${url}/${mail}`);
  }

  /* Should change login attempts based */
  setLoginAttempts(employee: Employee) {
    const url = environment.loginAttemptsUrl;
    return this.httpClient.put(`${url}`, employee);
  }
  
  /* Should return lock time based on mail */
  setLockTime(mail: string) {
    const url = environment.lockTimeUrl;
    return this.httpClient.get(`${url}/${mail}`);
  }

  /* Should return lock time left based on mail */
  getLockTimeLeft(mail: string): Observable<number> {
    const url = environment.lockTimeLeftUrl;
    return this.httpClient.get<number>(`${url}/${mail}`);
  }

  /* Should get employee based on id */
  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  /* Should check if the email id exists or not */
  emailExists(email: String): Observable<boolean> {
    let url = environment.emailExistsUrl;
    return this.httpClient.get<boolean>(`${url}/${email}`)
  }

  /* Download in Pdf, csv or excel file */
  download(type: String): Observable<Blob> {
    let url = environment.downloadUrl;
    return this.httpClient.get(`${url}/${type}`, { responseType: 'blob' });
  }

  /* Should change password based on id */
  changePassword(id: number, employee: Employee) {
    let url = environment.changePasswordUrl;
    return this.httpClient.put(`${url}/${id}`, employee);
  }

  /* Should change active based on id */
  changeActive(id: number, employee: Employee) {
    let url = environment.changeActiveUrl;
    return this.httpClient.put(`${url}/${id}`, employee);
  }

  /* Should change active based on email */
  changeActiveByMail(mail: string, employee: Employee) {
    let url = environment.changeActiveMailUrl;
    return this.httpClient.put(`${url}/${mail}`, employee);
  }
}
