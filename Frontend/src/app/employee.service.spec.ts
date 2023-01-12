import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [EmployeeService]
  }));

  it('should be created', () => {
    const service: EmployeeService = TestBed.get(EmployeeService);
    expect(service).toBeTruthy();
   });

   
   it('should get Employee List data', () => {
    const service: EmployeeService = TestBed.get(EmployeeService);
    expect(service.getEmployeesList).toBeTruthy();
   });
});
