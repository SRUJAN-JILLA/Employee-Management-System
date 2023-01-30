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
  temp: Employee = new Employee;

  constructor(public loginService:LoginService, private employeeService:EmployeeService,
    private router: Router){};

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(data=>{
      this.employee = data;
      // this.saveEmployee();
    });
  }

  user():any{
    return this.loginService.getUser();
  }

  updateDetails(id:number){
    this.router.navigate(['updateEmployee', id]);
  }
  
  changePassword(id:number){
    this.router.navigate(['changePassword']);

  }

}

  // saveEmployee() {
  //   this.temp.firstName = this.employee.firstName;
  //   this.temp.lastName = this.employee.lastName;
  //   this.temp.job = this.employee.job;
  //   this.temp.salary = this.employee.salary;
  //   this.temp.email = this.employee.email;
  //   this.temp.role = this.employee.role;
  //   this.temp.id = this.employee.id;
  //   this.temp.active = true;  
  //   this.employeeService.updateEmployee(this.temp.id, this.temp).subscribe(data => {
  //   },
  //     error => {});
  // }