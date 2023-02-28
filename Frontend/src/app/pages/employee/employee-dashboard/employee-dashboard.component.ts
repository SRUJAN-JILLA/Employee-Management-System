import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Employee } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  employee: Employee = new Employee();

  constructor(public loginService: LoginService, private employeeService: EmployeeService,
    private router: Router) { };

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(data => {
      this.employee = data;
    });

    this.employeeService.getSubscription().subscribe({
      next: (event: string) => {
        this.ngOnInit();
      }
    });
  }
  user(): any {
    return this.loginService.getUser();
  }

  /* Should navigate to update details page*/
  updateDetails(id: number) {
    this.router.navigate(['updateEmployee', id]);
  }

  /* Should navigate to change password page*/
  changePassword(id: number) {
    this.router.navigate(['changePassword']);
  }
}