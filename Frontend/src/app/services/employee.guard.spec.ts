import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeeGuard } from './employee.guard';

describe('EmployeeGuard', () => {
  let guard: EmployeeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [EmployeeGuard]
    });
    guard = TestBed.inject(EmployeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
