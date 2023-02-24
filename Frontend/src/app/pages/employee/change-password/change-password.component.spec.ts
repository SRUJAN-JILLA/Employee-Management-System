import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Employee } from 'src/app/classes/employee';
import { MaterialModule } from 'src/app/material/material.module';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoginService } from 'src/app/services/login.service';

import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let loginService:any;
  let employeeService:any;
  let router:any;
  let routerSpy:{navigate:jasmine.Spy};
  let loginServiceSpy:{getCurrentUser:jasmine.Spy,isLoggedIn:jasmine.Spy, logout:jasmine.Spy};
  let employeeServiceSpy:{emailExists:jasmine.Spy, changePassword:jasmine.Spy, updateEmployee:jasmine.Spy, addEmployee:jasmine.Spy, deleteEmployee:jasmine.Spy, getEmployeesList:jasmine.Spy, download:jasmine.Spy, changeActive:jasmine.Spy,  getCurrentUser:jasmine.Spy};

  let employees:Employee[]= [{"id":100003,"firstName":"Srujan","lastName":"Jilla","salary":900000.0,"email":"srujanjilla@gmail.com","job":"HR","password":"$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK","role":"ADMIN","active":false,"loginAttempts":0},
  {"id":100004,"firstName":"Sravan","lastName":"Jilla","salary":900000.0,"email":"sravanjilla@gmail.com","job":"HR","password":"$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK","role":"ADMIN","active":false,"loginAttempts":0}];
  let currentEmployee:Employee = {"id":100003,"firstName":"Srujan","lastName":"Jilla","salary":900000.0,"email":"srujanjilla@gmail.com","job":"HR","password":"$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK","role":"ADMIN","active":false,"loginAttempts":0};
  
  beforeEach(async () => {

    loginServiceSpy= jasmine.createSpyObj(LoginService,{'getCurrentUser':of(currentEmployee),'logout':of(true),'isLoggedIn':of(false)});
    employeeServiceSpy= jasmine.createSpyObj(EmployeeService,{'emailExists':of(true),'changePassword':of(true), 'updateEmployee':of(true), 'addEmployee':of(true), 'deleteEmployee':of(true), 'getEmployeesList':of(employees), 'download':of(true), 'changeActive':of(true), 'getCurrentUser':of(currentEmployee)});
    routerSpy= jasmine.createSpyObj(Router,{'navigate':of(true)});
    
    await TestBed.configureTestingModule({
      imports:[FormsModule,MaterialModule,HttpClientTestingModule],
      declarations:[ChangePasswordComponent],
      providers:[
        { provide: LoginService, useValue:loginServiceSpy},
        { provide: EmployeeService, useValue:employeeServiceSpy},
        { provide: Router, useValue:routerSpy}
      ]
    })
    .compileComponents()
    .then(() =>{
      fixture = TestBed.createComponent(ChangePasswordComponent);
      component = fixture.componentInstance;
      loginService = TestBed.inject(LoginService);
      employeeService =  TestBed.inject(EmployeeService);
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login cosmponent', () => {
    employeeService.emailExists.and.returnValue(of(false));
    fixture.debugElement.nativeElement.querySelector('.btn').click()
    fixture.detectChanges();
    employeeService.changePassword.and.returnValue(of(true));
    loginService.logout.and.returnValue(of(true));
    expect(component).toBeTruthy();
  });

  it('should not if passwords dont match navigate to login cosmponent', () => {
    employeeService.emailExists.and.returnValue(of(false));
    component.currentEmployee.password="asdfasdf";
    component.confirmPassword="asdfasgasfa";
    fixture.debugElement.nativeElement.querySelector('.btn').click()
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
