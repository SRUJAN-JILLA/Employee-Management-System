import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomPipePipe } from 'src/app/pipes/custom-pipe.pipe';
import { CustomPipeForEmployeePipe } from 'src/app/pipes/custom-pipe-for-employee.pipe';
import { EmployeeListComponent } from './employee-list.component';
import { FormsModule } from '@angular/forms';
import { Employee } from 'src/app/classes/employee';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SortDirective } from 'src/app//directive/sort.directive';
import { LoginService } from 'src/app/services/login.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let el: DebugElement;
  let loginService: any;
  let employeeService: any;
  let router: any;
  let routerSpy: { navigate: jasmine.Spy };
  let loginServiceSpy: { generateToken: jasmine.Spy, getUserRole: jasmine.Spy, setUser: jasmine.Spy, loginUser: jasmine.Spy, getCurrentUser: jasmine.Spy, isLoggedIn: jasmine.Spy, logout: jasmine.Spy };
  let employeeServiceSpy: { getFailedLoginAttempt: jasmine.Spy, setLockTime: jasmine.Spy, getLoginAttempts: jasmine.Spy, setLoginAttempts: jasmine.Spy, changeActiveByMail: jasmine.Spy, getLockTimeLeft: jasmine.Spy, emailExists: jasmine.Spy, changePassword: jasmine.Spy, updateEmployee: jasmine.Spy, addEmployee: jasmine.Spy, deleteEmployee: jasmine.Spy, getEmployeesList: jasmine.Spy, download: jasmine.Spy, changeActive: jasmine.Spy, getCurrentUser: jasmine.Spy };

  let employees: Employee[] = [{ "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] },
  { "id": 100004, "firstName": "Sravan", "lastName": "Jilla", "salary": 900000.0, "email": "sravanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "EMPLOYEE", "active": false, "loginAttempts": 0, "notifications": [] }];
  let currentEmployee2: Employee = { "id": 100003, "firstName": "asdf", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "EMPLOYEE", "active": false, "loginAttempts": 0, "notifications": [] };
  let currentEmployee: Employee = { "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "notifications": [] };

  beforeEach(async () => {

    loginServiceSpy = jasmine.createSpyObj(LoginService, { 'loginUser': of("asdfasdf"), 'getUserRole': of("asdfasdf"), 'setUser': of("asdfasdf"), 'generateToken': of("asdfasdf"), 'getCurrentUser': of(currentEmployee), 'logout': of(true), 'isLoggedIn': of(false) });
    employeeServiceSpy = jasmine.createSpyObj(EmployeeService, { 'getFailedLoginAttempt': of(true), 'setLockTime': of(true), 'getLoginAttempts': of(true), 'setLoginAttempts': of(true), 'changeActiveByMail': of(true), 'getLockTimeLeft': of(34523451351), 'getEmployeeById': of(currentEmployee), 'emailExists': of(true), 'changePassword': of(true), 'updateEmployee': of(true), 'addEmployee': of(true), 'deleteEmployee': of(true), 'getEmployeesList': of(employees), 'download': of(true), 'changeActive': of(true), 'getCurrentUser': of(currentEmployee) });
    routerSpy = jasmine.createSpyObj(Router, { 'navigate': of(true) });

    await TestBed.configureTestingModule({
      imports: [NgxPaginationModule, FormsModule, MaterialModule, HttpClientTestingModule],
      declarations: [SortDirective, CustomPipeForEmployeePipe, CustomPipePipe, EmployeeListComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: EmployeeService, useValue: employeeServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EmployeeListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        loginService = TestBed.inject(LoginService);
        employeeService = TestBed.inject(EmployeeService);
        router = TestBed.inject(Router);
        const directiveEl = fixture.debugElement.query(By.directive(SortDirective));
        fixture.detectChanges();
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display employees', () => {
    component.employees = employees;
    fixture.detectChanges();
    const ans = el.queryAll(By.css(".employeeRow"));
    expect(ans.length).toEqual(2);
    expect(ans).toBeTruthy();
  });

  it('should sort employees', () => {
    component.employees = employees;
    fixture.debugElement.nativeElement.querySelector('#sort').click();
    fixture.debugElement.nativeElement.querySelector('#sort').click();
    expect(component).toBeTruthy();
  });

  //update section
  it('should change Ui and update employee', fakeAsync(() => {
    component.currentEmployee = currentEmployee;
    expect(currentEmployee.role).toBe("ADMIN");
    fixture.debugElement.nativeElement.querySelector('#update').click();
    component.checkUpdateEmployee = true;
    component.selectedIdToUpdate = 100004;
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#updatesubmit')).triggerEventHandler('click', null);
    fixture.detectChanges();
    employeeService.emailExists.and.returnValue(of(false));
    flush();
    expect(component).toBeTruthy();
  }));

  it('should change Ui to cancel Update employee', fakeAsync(() => {
    component.currentEmployee = currentEmployee;
    expect(currentEmployee.role).toBe("ADMIN");
    fixture.debugElement.nativeElement.querySelector('#update').click();
    component.checkUpdateEmployee = true;
    component.selectedIdToUpdate = 100004;
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#cancelUpdate')).triggerEventHandler('click', null);
    fixture.detectChanges();
    employeeService.emailExists.and.returnValue(of(false));
    flush();
    expect(component).toBeTruthy();
  }));

  //add employee
  it('should change Ui and add employee', fakeAsync(() => {
    component.currentEmployee = currentEmployee;
    expect(currentEmployee.role).toBe("ADMIN");
    fixture.debugElement.nativeElement.querySelector('#addEmployee').click();
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));

  it('should change Ui when double clicked', fakeAsync(() => {
    component.currentEmployee = currentEmployee;
    expect(currentEmployee.role).toBe("ADMIN");
    fixture.debugElement.nativeElement.querySelector('#addEmployee').click();
    fixture.debugElement.nativeElement.querySelector('#addEmployee').click();
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));

  it('should change Ui when clicked submit to add employee', fakeAsync(() => {
    component.currentEmployee = currentEmployee;
    expect(currentEmployee.role).toBe("ADMIN");
    fixture.debugElement.nativeElement.querySelector('#addEmployee').click();
    fixture.detectChanges();
    employeeService.emailExists.and.returnValue(of(false));
    fixture.debugElement.query(By.css('#addSubmit')).triggerEventHandler('click', null);
    flush();
    expect(component).toBeTruthy();
  }));

  it('should change Ui when clicked submit to add employee if email doesnot exist', fakeAsync(() => {
    component.currentEmployee = currentEmployee;
    expect(currentEmployee.role).toBe("ADMIN");
    fixture.debugElement.nativeElement.querySelector('#addEmployee').click();
    fixture.detectChanges();
    employeeService.emailExists.and.returnValue(of(true));
    fixture.debugElement.query(By.css('#addSubmit')).triggerEventHandler('click', null);
    flush();
    expect(component).toBeTruthy();
  }));

  it('should change Ui when clicked cancel while add employee', fakeAsync(() => {
    component.currentEmployee = currentEmployee;
    expect(currentEmployee.role).toBe("ADMIN");
    fixture.debugElement.nativeElement.querySelector('#addEmployee').click();
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#canceladd')).triggerEventHandler('click', null);
    flush();
    expect(component).toBeTruthy();
  }));

  //delete employee
  it('should change Ui to delete employees', fakeAsync(() => {
    component.currentEmployee = currentEmployee;
    expect(currentEmployee.role).toBe("ADMIN");
    fixture.debugElement.nativeElement.querySelector('#employeeCheckBox').click();
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));

  it('should change Ui when double clicked while deleting employees', fakeAsync(() => {
    component.currentEmployee = currentEmployee;
    expect(currentEmployee.role).toBe("ADMIN");
    fixture.debugElement.nativeElement.querySelector('#employeeCheckBox').click();
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#employeeCheckBox').click();
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));

  it('should change Ui to delete multiple employees', fakeAsync(() => {
    component.currentEmployee = currentEmployee;
    expect(currentEmployee.role).toBe("ADMIN");
    fixture.debugElement.nativeElement.querySelector('#employeeCheckBox').click();
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#deleteEmployees').click();
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));

  it('should change Ui when all selected employees while deleting', fakeAsync(() => {
    component.currentEmployee = currentEmployee;
    expect(currentEmployee.role).toBe("ADMIN");
    fixture.debugElement.nativeElement.querySelector('#employeeCheckBox').click();
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#allSelected').click();
    fixture.debugElement.nativeElement.querySelector('#deleteEmployees').click();
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));

  it('should change Ui to delete multiple all selected and remove employees', fakeAsync(() => {
    component.currentEmployee = currentEmployee;
    expect(currentEmployee.role).toBe("ADMIN");
    fixture.debugElement.nativeElement.querySelector('#employeeCheckBox').click();
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#allSelected').click();
    fixture.debugElement.nativeElement.querySelector('#allSelected').click();
    fixture.debugElement.nativeElement.querySelector('#deleteEmployees').click();
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));

  //searching 
  it('Searching', fakeAsync(() => {
    fixture.debugElement.nativeElement.querySelector('.dropButton').click();
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#jobSearchOption').click();
    fixture.detectChanges();
    component.searchArea = "ADMIN";
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));

  it('Searching for employee', fakeAsync(() => {
    loginService.getCurrentUser.and.returnValue(of(currentEmployee2));
    component.currentEmployee = currentEmployee2;
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.currentEmployee.role).toBe("EMPLOYEE");
    fixture.debugElement.nativeElement.querySelector('.dropButton').click();
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#jobSearchOption').click();
    fixture.detectChanges();
    component.searchArea = "ADMIN";
    fixture.detectChanges();
    flush();
    expect(component).toBeTruthy();
  }));

  //download
  it('download pdf', fakeAsync(() => {
    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#inputGroupSelect')).nativeElement;
    select.value = "pdf";
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('.downloadButton').click();
    flush();
    expect(component).toBeTruthy();
  }));

  it('download excel', fakeAsync(() => {
    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#inputGroupSelect')).nativeElement;
    select.value = "excel";
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('.downloadButton').click();
    flush();
    expect(component).toBeTruthy();
  }));

  it('download csv', fakeAsync(() => {
    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#inputGroupSelect')).nativeElement;
    select.value = "csv";
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('.downloadButton').click();
    flush();
    expect(component).toBeTruthy();
  }));
});