import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Employee } from 'src/app/classes/employee';
import { MaterialModule } from 'src/app/material/material.module';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoginService } from 'src/app/services/login.service';
import { of } from 'rxjs';

import { NavbarComponent } from './navbar.component';
import { FormsModule } from '@angular/forms';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
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
      declarations:[NavbarComponent],
      providers:[
        { provide: LoginService, useValue:loginServiceSpy},
        { provide: EmployeeService, useValue:employeeServiceSpy},
        { provide: Router, useValue:routerSpy}
      ]
    })
    .compileComponents()
    .then(() =>{
      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      loginService = TestBed.inject(LoginService);
      employeeService =  TestBed.inject(EmployeeService);
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });

  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  // if the user is not logged in 
  it('should navigate to login component', fakeAsync(() => {
    loginService.isLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#login').click()
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/login']);

  }));

  it('should navigate to signup component', fakeAsync(() => {
    loginService.isLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#signup').click()
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/signup']);
  }));

  // if the user is logged in
  it('should navigate to employeeList component', fakeAsync(() => {
    loginService.isLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#employeeList').click()
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/employeelist']);
  }));

  it('should navigate to my profile (employee) component', fakeAsync(() => {
    loginService.isLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#employee').click()
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/employee']);
  }));

  it('should logout and navigate to main component', fakeAsync(() => {
    loginService.isLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#logout').click()
    employeeService.changeActive.and.returnValue(of(true));
    loginService.logout.and.returnValue(of(true));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
});
