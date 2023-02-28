import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/classes/employee';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  checkPassword: boolean;
  currentEmployee: Employee = new Employee();
  password1: string;
  confirmPassword: string;
  tempEmployeeUpdatePassowrd: Employee = new Employee;

  constructor(public loginService: LoginService, private employeeService: EmployeeService, private router: Router) { };

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(data => {
      this.currentEmployee = data;
    });
  }

  /* On submit should validate & change password */
  formSubmit() {
    if (this.password1 !== this.confirmPassword) {
      this.checkPassword = true;
    } else {
      this.checkPassword = false;
      this.currentEmployee.password = this.password1;
      this.saveEmployee();
      alert("You will be logged out! Since you have changed Password!!")
      this.mainLogout();
    }
  }

  /* Should save an employee with new password*/
  saveEmployee() {
    this.tempEmployeeUpdatePassowrd.password = this.password1;
    this.tempEmployeeUpdatePassowrd.active = false;
    this.employeeService.changePassword(this.currentEmployee.id, this.tempEmployeeUpdatePassowrd).subscribe(data => {
    });
  }

  /* Should navigate to employee dashboard page*/
  employeeDashBoard() {
    this.router.navigate(['/employee']);
  }

  /* Should navigate to main page*/
  mainLogout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}