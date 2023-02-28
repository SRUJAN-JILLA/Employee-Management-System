import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Employee } from '../classes/employee';

import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let employeeService: EmployeeService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EmployeeService
      ]
    });
    employeeService = TestBed.inject(EmployeeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(employeeService).toBeTruthy();
  });

  it('should retrive all employees', () => {
    employeeService.getEmployeesList().subscribe(employees => {

      expect(employees).toBeTruthy('No Courses Returned.');
      expect(employees[0].id).toBeGreaterThan(1);
    })
    const req = httpTestingController.expectOne('http://localhost:8080/employees')

    expect(req.request.method).toEqual("GET");

    req.flush([{ "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "lockTime": "2022-12-16T11:26:49.392+00:00", "notifications": [] }]);
  });

  it('should retrive employee by id', () => {
    employeeService.getEmployeeById(100003).subscribe(employee => {

      expect(employee).toBeTruthy('Nothing Returned.');
      expect(employee.firstName).toEqual("Srujan");
    })
    const req = httpTestingController.expectOne('http://localhost:8080/employees/100003')
    expect(req.request.method).toEqual("GET");
    req.flush({ "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "lockTime": "2022-12-16T11:26:49.392+00:00", "notifications": [] });

  });

  it('should give Locktime left by mail', () => {
    employeeService.getLockTimeLeft("srujanjilla@gmail.com").subscribe(TimeleftinMilli => {

      expect(TimeleftinMilli).toBeTruthy('Nothing Returned.');
      expect(TimeleftinMilli).toBeGreaterThan(0);
    })
    const req = httpTestingController.expectOne('http://localhost:8080/employees/lockTimeLeft/srujanjilla@gmail.com')
    expect(req.request.method).toEqual("GET");
    req.flush(100000);

  });

  it('should give login attempts by mail', () => {
    employeeService.getLoginAttempts("srujanjilla@gmail.com").subscribe(loginAttempts => {

      expect(loginAttempts).toBeTruthy('Nothing Returned.');
      expect(loginAttempts).toBeGreaterThan(0);
    })
    const req = httpTestingController.expectOne('http://localhost:8080/employees/loginAttempts/srujanjilla@gmail.com')
    expect(req.request.method).toEqual("GET");
    req.flush(100000);

  });

  it('should add new employee', () => {

    pending();

  });


  it('should update login attempts', () => {
    let employee: Employee = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] }
    employeeService.setLoginAttempts(employee).subscribe(data => {

      expect(data).toBeTruthy('Nothing Returned.');
      expect(data).toEqual("Updated");
    })
    const req = httpTestingController.expectOne('http://localhost:8080/employees/loginAttempts')
    expect(req.request.method).toEqual("PUT");
    req.flush("Updated");

  });

  it('should update lock time', () => {
    let employee: Employee = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] }
    employeeService.setLockTime("srujanjilla@gmail.com").subscribe(data => {

      expect(data).toBeTruthy('Nothing Returned.');
      expect(data).toEqual("Updated");
    })
    const req = httpTestingController.expectOne('http://localhost:8080/employees/lockTime/srujanjilla@gmail.com')
    expect(req.request.method).toEqual("GET");
    req.flush("Updated");

  });

  it('shouldcheck if email exists or not', () => {
    let employee: Employee = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] }
    employeeService.emailExists("srujanjilla@gmail.com").subscribe(data => {

      expect(data).toBeTruthy('Nothing Returned.');
      expect(data).toEqual(true);
    })
    const req = httpTestingController.expectOne('http://localhost:8080/employees/emailExists/srujanjilla@gmail.com')
    expect(req.request.method).toEqual("GET");
    req.flush(true);

  });

  it('should change password', () => {
    let employee: Employee = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] }
    employeeService.changePassword(100003, employee).subscribe(data => {

      expect(data).toBeTruthy('Nothing Returned.');
      expect(data).toEqual("Updated");
    })
    const req = httpTestingController.expectOne('http://localhost:8080/employees/changePassword/100003')
    expect(req.request.method).toEqual("PUT");
    req.flush("Updated");

  });

  it('should change active', () => {
    let employee: Employee = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] }
    employeeService.changeActive(100003, employee).subscribe(data => {

      expect(data).toBeTruthy('Nothing Returned.');
      expect(data).toEqual("Updated");
    })
    const req = httpTestingController.expectOne('http://localhost:8080/employees/changeActive/100003')
    expect(req.request.method).toEqual("PUT");
    req.flush("Updated");

  });

  it('should change active', () => {
    let employee: Employee = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] }
    employeeService.changeActiveByMail("srujanjilla@gmail.com", employee).subscribe(data => {

      expect(data).toBeTruthy('Nothing Returned.');
      expect(data).toEqual("Updated");
    })
    const req = httpTestingController.expectOne('http://localhost:8080/employees/changeActive/mail/srujanjilla@gmail.com')
    expect(req.request.method).toEqual("PUT");
    req.flush("Updated");

  });


  it('should delete employeee', () => {
    let employee: Employee = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] }
    employeeService.deleteEmployee(100003).subscribe(data => {

      expect(data).toBeTruthy('Nothing Returned.');
      expect(data).toEqual("Deleted");
    })
    const req = httpTestingController.expectOne('http://localhost:8080/employees/100003')
    expect(req.request.method).toEqual("DELETE");
    req.flush("Deleted");

  });
  afterEach(() => {
    httpTestingController.verify();
  })

});
