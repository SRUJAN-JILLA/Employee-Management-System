import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/classes/employee';
import { ActivatedRoute, Router } from '@angular/router';
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
  temp: Employee = new Employee;

  constructor(public loginService: LoginService, private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { };

  ngOnInit(): void {

    this.loginService.getCurrentUser().subscribe(data => {
      this.currentEmployee = data;
    });
  }

  formSubmit() {
    if (this.password1 !== this.confirmPassword) {
      this.checkPassword = true;
      console.log("Passwords don't match");
    } else {

      this.checkPassword = false;
      this.currentEmployee.password = this.password1;

      this.saveEmployee();
      alert("You will be logged out! Since you have changed Password!!")
      this.mainLogout();

    }

  }

  saveEmployee() {

    this.temp.password = this.password1;
    this.temp.active = false;
    this.employeeService.changePassword(this.currentEmployee.id, this.temp).subscribe(data => {
    },
      error => console.log(error));
  }

  employeeDashBoard() {
    this.router.navigate(['/employee']);
  }
  mainLogout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
