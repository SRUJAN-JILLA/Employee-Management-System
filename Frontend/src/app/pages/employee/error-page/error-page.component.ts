import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Employee } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {

  constructor(public loginService: LoginService, private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { };

  homePage() {
    this.router.navigate(['/employee']);

  }
}
