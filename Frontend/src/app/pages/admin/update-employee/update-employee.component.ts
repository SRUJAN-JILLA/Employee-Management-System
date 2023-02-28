import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/classes/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

  id: number;
  employee: Employee = new Employee();
  email: string
  checkEmailExists: boolean;
  tempEmployeeUpdate: Employee = new Employee;
  currentEmployee: Employee = new Employee();
  isAdmin: boolean;
  constructor(public loginService: LoginService, private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { };

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
      this.email = this.employee.email;
    });
    this.loginService.getCurrentUser().subscribe(data => {
      this.currentEmployee = data;
    });
  }

  /* Should validate and update Employee*/
  async onSubmit() {

    //checking for email exists or not 
    const res: any = await this.employeeService.emailExists(this.employee.email).toPromise();

    this.checkEmailExists = res;
    if (this.currentEmployee.firstName == this.employee.firstName &&
      this.currentEmployee.lastName == this.employee.lastName &&
      this.currentEmployee.email == this.employee.email &&
      this.currentEmployee.salary == this.employee.salary &&
      this.currentEmployee.job == this.employee.job &&
      this.currentEmployee.role == this.employee.role) {
      this.router.navigate(['/employee']);
    } else {
      if (this.currentEmployee.email == this.employee.email) {
        this.saveEmployee();
        this.goToEmployeeDashboard();
      }
      else if (this.currentEmployee.email != this.employee.email && !res) {
        this.saveEmployee();
        alert("You will be logged out! Since you have changed Email!!")
        this.mainLogout();
      }
    }
  }

  /* Should update Employee*/
  saveEmployee() {
    this.tempEmployeeUpdate.firstName = this.employee.firstName;
    this.tempEmployeeUpdate.lastName = this.employee.lastName;
    this.tempEmployeeUpdate.job = this.employee.job;
    this.tempEmployeeUpdate.salary = this.employee.salary;
    this.tempEmployeeUpdate.email = this.employee.email;
    this.tempEmployeeUpdate.role = this.employee.role;
    this.tempEmployeeUpdate.id = this.employee.id;
    this.tempEmployeeUpdate.active = false;
    this.tempEmployeeUpdate.notifications = this.employee.notifications;

    this.employeeService.updateEmployee(this.tempEmployeeUpdate.id, this.tempEmployeeUpdate, this.currentEmployee.firstName
      , this.currentEmployee.id, this.tempEmployeeUpdate.firstName).subscribe(data => {
      });
  }

  /* Should navigate to employee dashboard page*/
  async goToEmployeeDashboard() {
    this.router.navigate(['/employee']);
  }

  /* check if Role is admin or not */
  checkRoleAsAdmin() {
    return this.currentEmployee.role === "ADMIN";
  }

  /* Should navigate to main page*/
  mainLogout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}