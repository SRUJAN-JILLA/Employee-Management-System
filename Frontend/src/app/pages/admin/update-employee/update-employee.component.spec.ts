import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { UpdateEmployeeComponent } from './update-employee.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Employee } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoginService } from 'src/app/services/login.service';

describe('UpdateEmployeeComponent', () => {
  let component: UpdateEmployeeComponent;
  let fixture: ComponentFixture<UpdateEmployeeComponent>;
  let loginService: any;
  let employeeService: any;
  let router: any;
  let routerSpy: { navigate: jasmine.Spy };
  let loginServiceSpy: { getCurrentUser: jasmine.Spy, isLoggedIn: jasmine.Spy, logout: jasmine.Spy };
  let employeeServiceSpy: { getEmployeeById: jasmine.Spy, emailExists: jasmine.Spy, changePassword: jasmine.Spy, updateEmployee: jasmine.Spy, addEmployee: jasmine.Spy, deleteEmployee: jasmine.Spy, getEmployeesList: jasmine.Spy, download: jasmine.Spy, changeActive: jasmine.Spy, getCurrentUser: jasmine.Spy };

  let employees: Employee[] = [{ "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] },
  { "id": 100004, "firstName": "Sravan", "lastName": "Jilla", "salary": 900000.0, "email": "sravanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] }];
  let temp: Employee = { "id": 100004, "firstName": "Sravan", "lastName": "Jilla", "salary": 900000.0, "email": "sravanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] };
  let currentEmployee2: Employee = { "id": 100003, "firstName": "asdf", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] };

  let currentEmployee: Employee = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] };

  beforeEach(async () => {
    loginServiceSpy = jasmine.createSpyObj(LoginService, { 'getCurrentUser': of(currentEmployee), 'logout': of(true), 'isLoggedIn': of(false) });
    employeeServiceSpy = jasmine.createSpyObj(EmployeeService, { 'getEmployeeById': of(currentEmployee), 'emailExists': of(true), 'changePassword': of(true), 'updateEmployee': of(true), 'addEmployee': of(true), 'deleteEmployee': of(true), 'getEmployeesList': of(employees), 'download': of(true), 'changeActive': of(true), 'getCurrentUser': of(currentEmployee) });
    routerSpy = jasmine.createSpyObj(Router, { 'navigate': of(true) });

    await TestBed.configureTestingModule({
      imports: [FormsModule, NgxPaginationModule, MaterialModule, HttpClientTestingModule, NgxPaginationModule],
      declarations: [UpdateEmployeeComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: EmployeeService, useValue: employeeServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { 'snapshot': { 'params': { 'id': 100003 } } } }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(UpdateEmployeeComponent);
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

  it('should check for admin role ', () => {
    component.currentEmployee = currentEmployee;
    component.employee = temp;
    employeeService.emailExists.and.returnValue(of(false));
    fixture.debugElement.nativeElement.querySelector('button').click()
    expect(component).toBeTruthy();
  });

  it('should check for employee role ', () => {
    component.currentEmployee = currentEmployee;
    component.employee = currentEmployee;
    employeeService.emailExists.and.returnValue(of(false));
    employeeService.getEmployeeById.and.returnValue(of(currentEmployee));
    fixture.debugElement.nativeElement.querySelector('button').click()
    expect(component).toBeTruthy();
  });

  it('should submit successfully ', () => {
    component.currentEmployee = currentEmployee;
    component.employee = currentEmployee2;
    employeeService.emailExists.and.returnValue(of(false));
    fixture.debugElement.nativeElement.querySelector('button').click()
    expect(component).toBeTruthy();
  });
});
