import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Employee } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  employee: Employee = new Employee();
  role: string;
  tempEmployeeToChange: Employee = new Employee;

  constructor(public loginService: LoginService, private employeeService: EmployeeService, private router: Router) {};

  /* Should navigate to home page*/
  home() {
    this.router.navigate(['']);
  }

  /* Should navigate to login page*/
  login() {
    this.router.navigate(['/login']);
  }

  /* Should navigate to sign up page*/
  signup() {
    this.router.navigate(['/signup']);
  }

  /* Should navigate to home page*/
  main() {
    this.changeActive();
    this.loginService.logout();
    this.router.navigate(['/']);
  } 

  /* Should navigate to employees page*/
  employeeList() {
    this.router.navigate(['/employeelist']);
  }

  /* Should navigate to employee details page*/
  employeeHome() {
    this.router.navigate(['/employee']);
  }

  /* Should change active to false */
  changeActive() {
    this.employee = this.loginService.getUser();
    this.tempEmployeeToChange.id = this.employee.id;
    this.tempEmployeeToChange.active = false;
    this.employeeService.changeActive(this.tempEmployeeToChange.id, this.tempEmployeeToChange).subscribe(data => {});
  }
}