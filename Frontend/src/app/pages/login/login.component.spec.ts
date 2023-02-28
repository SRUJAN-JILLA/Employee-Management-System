import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Employee } from 'src/app/classes/employee';
import { MaterialModule } from 'src/app/material/material.module';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoginService } from 'src/app/services/login.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: any;
  let employeeService: any;
  let router: any;
  let routerSpy: { navigate: jasmine.Spy };
  let loginServiceSpy: { generateToken: jasmine.Spy, getUserRole: jasmine.Spy, setUser: jasmine.Spy, loginUser: jasmine.Spy, getCurrentUser: jasmine.Spy, isLoggedIn: jasmine.Spy, logout: jasmine.Spy };
  let employeeServiceSpy: { getFailedLoginAttempt: jasmine.Spy, setLockTime: jasmine.Spy, getLoginAttempts: jasmine.Spy, setLoginAttempts: jasmine.Spy, changeActiveByMail: jasmine.Spy, getLockTimeLeft: jasmine.Spy, emailExists: jasmine.Spy, changePassword: jasmine.Spy, updateEmployee: jasmine.Spy, addEmployee: jasmine.Spy, deleteEmployee: jasmine.Spy, getEmployeesList: jasmine.Spy, download: jasmine.Spy, changeActive: jasmine.Spy, getCurrentUser: jasmine.Spy };

  let employees: Employee[] = [{ "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] },
  { "id": 100004, "firstName": "Sravan", "lastName": "Jilla", "salary": 900000.0, "email": "sravanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] }];
  let temp: Employee = { "id": 100004, "firstName": "Sravan", "lastName": "Jilla", "salary": 900000.0, "email": "sravanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] };
  let currentEmployee2: Employee = { "id": 100003, "firstName": "asdf", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] };
  let currentEmployee: Employee = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] };

  beforeEach(async () => {

    loginServiceSpy = jasmine.createSpyObj(LoginService, { 'loginUser': of("asdfasdf"), 'getUserRole': of("asdfasdf"), 'setUser': of("asdfasdf"), 'generateToken': of("asdfasdf"), 'getCurrentUser': of(currentEmployee), 'logout': of(true), 'isLoggedIn': of(false) });
    employeeServiceSpy = jasmine.createSpyObj(EmployeeService, { 'getFailedLoginAttempt': of(true), 'setLockTime': of(true), 'getLoginAttempts': of(true), 'setLoginAttempts': of(true), 'changeActiveByMail': of(true), 'getLockTimeLeft': of(34523451351), 'getEmployeeById': of(currentEmployee), 'emailExists': of(true), 'changePassword': of(true), 'updateEmployee': of(true), 'addEmployee': of(true), 'deleteEmployee': of(true), 'getEmployeesList': of(employees), 'download': of(true), 'changeActive': of(true), 'getCurrentUser': of(currentEmployee) });
    routerSpy = jasmine.createSpyObj(Router, { 'navigate': of(true) });

    await TestBed.configureTestingModule({
      imports: [FormsModule, MaterialModule, HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: EmployeeService, useValue: employeeServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        loginService = TestBed.inject(LoginService);
        employeeService = TestBed.inject(EmployeeService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
      });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if email exists ', fakeAsync(() => {
    employeeService.emailExists.and.returnValue(of(true));
    fixture.debugElement.nativeElement.querySelector('button').click();
    flush();
    expect(component).toBeTruthy();
  }));

  it(' should check if email doesnot existt', fakeAsync(() => {
    employeeService.emailExists.and.returnValue(of(false));
    fixture.debugElement.nativeElement.querySelector('button').click();
    flush();
    expect(component).toBeTruthy();
  }));

  it('should check if employee has rokle as Employee', fakeAsync(() => {
    employeeService.emailExists.and.returnValue(of(true));
    loginService.getUserRole.and.returnValue("EMPLOYEE");
    fixture.debugElement.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));

  it('should check if it throws error while generates token', fakeAsync(() => {
    employeeService.emailExists.and.returnValue(of(true));
    loginService.generateToken.and.returnValue(throwError({ status: 505 }));
    employeeService.getLoginAttempts.and.returnValue(of(true));
    fixture.debugElement.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));

  it('should check if the number of login attempts is 4 ', fakeAsync(() => {
    employeeService.emailExists.and.returnValue(of(true));
    loginService.generateToken.and.returnValue(throwError({ status: 505 }));
    employeeService.getLoginAttempts.and.returnValue(of(4));
    fixture.debugElement.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));

  it('should check if the number of login attempts is less than 4 ', fakeAsync(() => {
    employeeService.emailExists.and.returnValue(of(true));
    loginService.generateToken.and.returnValue(throwError({ status: 505 }));
    employeeService.getLoginAttempts.and.returnValue(of(2));
    fixture.debugElement.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));

  it('should check if the number of login attempts is more than 4', fakeAsync(() => {
    employeeService.emailExists.and.returnValue(of(true));
    employeeService.getFailedLoginAttempt.and.returnValue(of(23));
    fixture.debugElement.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));

  it('should navigate to signup component', () => {
    fixture.debugElement.nativeElement.querySelector('.signup').click()
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/signup']);
    expect(component).toBeTruthy();
  });
});
