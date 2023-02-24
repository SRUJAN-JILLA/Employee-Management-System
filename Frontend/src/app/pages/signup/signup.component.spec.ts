import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Employee } from 'src/app/classes/employee';
import { MaterialModule } from 'src/app/material/material.module';
import { EmployeeService } from 'src/app/services/employee.service';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;  
  let router:any;
  let routerSpy:{navigate:jasmine.Spy};
  let employeeService:any;
  let employeeServiceSpy:{emailExists:jasmine.Spy,addEmployee:jasmine.Spy};

   let employees:Employee[]= [{"id":100003,"firstName":"Srujan","lastName":"Jilla","salary":900000.0,"email":"srhujanjilla@gmail.com","job":"HR","password":"$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK","role":"ADMIN","active":false,"loginAttempts":0},
  {"id":100004,"firstName":"Sravan","lastName":"Jilla","salary":900000.0,"email":"sravanjilla@gmail.com","job":"HR","password":"$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK","role":"ADMIN","active":false,"loginAttempts":0}];
  let currentEmployee:Employee = {"id":100003,"firstName":"Srujan","lastName":"Jilla","salary":900000.0,"email":"srujanjilla@gmail.com","job":"HR","password":"$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK","role":"ADMIN","active":false,"loginAttempts":0};
  
  beforeEach(async () => {

    employeeServiceSpy= jasmine.createSpyObj(EmployeeService,{'emailExists':of(true), 'addEmployee':of(true)}),
    routerSpy= jasmine.createSpyObj(Router,{'navigate':of(true)});
    
    await TestBed.configureTestingModule({      
      imports:[FormsModule,MaterialModule,HttpClientTestingModule],
      declarations:[SignupComponent],
      providers:[
        { provide: EmployeeService, useValue:employeeServiceSpy},
        { provide: Router, useValue:routerSpy}
      ]
    })
    .compileComponents()
    .then(() =>{
      fixture = TestBed.createComponent(SignupComponent);
      component = fixture.componentInstance;
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
    expect(component).toBeTruthy();
  });

  it('should not if email exists navigate to login cosmponent', () => {
    employeeService.emailExists.and.returnValue(of(true));
    fixture.debugElement.nativeElement.querySelector('.btn').click()
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not if passwords dont match navigate to login cosmponent', () => {
    employeeService.emailExists.and.returnValue(of(false));
    component.employee.password="asdfasdf";
    component.confirmPassword="asdfasgasfa";
    fixture.debugElement.nativeElement.querySelector('.btn').click()
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
