import { TestBed } from '@angular/core/testing';

import { EmployeeListComponent } from './employee-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';

describe('EmployeeListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EmployeeListComponent
      ],imports: [HttpClientTestingModule,RouterTestingModule], 
      providers: [EmployeeListComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const app = fixture.componentInstance;
   
    expect(app).toBeTruthy();
  });

  // it('should get employees list from service', () => {
  //   const fixture = TestBed.createComponent(EmployeeListComponent);
  //   //this is getting instance of Employeelist component
  //   const app = fixture.componentInstance;
  //   //this is getting instance of Employee service 
  //   const service = fixture.debugElement.injector.get(EmployeeService);
  //   const spy = spyOn(service, "getEmployeesList").and.returnValue(Promise.resolve(Observable<Employee[]>));
  //   fixture.detectChanges();
  //   expect(service.getEmployeesList).toContain(app.employees);
  // });
});
