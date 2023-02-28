import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Employee } from 'src/app/classes/employee';
import { LoginService } from 'src/app/services/login.service';

describe('EmployeeDashboardComponent', () => {
  let component: EmployeeDashboardComponent;
  let fixture: ComponentFixture<EmployeeDashboardComponent>;
  let loginService: any;
  let router: any;
  let routerSpy: { navigate: jasmine.Spy };
  let loginServiceSpy: { getCurrentUser: jasmine.Spy, isLoggedIn: jasmine.Spy, logout: jasmine.Spy };

  let employees: Employee[] = [{ "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] },
  { "id": 100004, "firstName": "Sravan", "lastName": "Jilla", "salary": 900000.0, "email": "sravanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] }];
  let currentEmployee: Employee = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] };

  beforeEach(async () => {

    loginServiceSpy = jasmine.createSpyObj(LoginService, { 'getCurrentUser': of(currentEmployee), 'logout': of(true), 'isLoggedIn': of(false) });
    routerSpy = jasmine.createSpyObj(Router, { 'navigate': of(true) });

    await TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientTestingModule],
      declarations: [EmployeeDashboardComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EmployeeDashboardComponent);
        component = fixture.componentInstance;
        loginService = TestBed.inject(LoginService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to change password component', () => {
    fixture.debugElement.nativeElement.querySelector('#changepassowrd').click()
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/changePassword']);
    expect(component).toBeTruthy();
  });

  it('should navigate to update component', () => {
    fixture.debugElement.nativeElement.querySelector('#update').click()
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
