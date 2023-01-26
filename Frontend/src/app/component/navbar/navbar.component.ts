import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  role:string;
  temp: Employee = new Employee;

  constructor(public loginService:LoginService, private employeeService:EmployeeService,private route: ActivatedRoute, private router: Router){};

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(data=>{
      this.employee = data;
      this.role = this.employee.role;
    });
  }

  login(){
    this.router.navigate(['/login']);
  }
  signup(){
    this.router.navigate(['/signup']);
  } 

  main(){
    this.saveEmployee();
    this.loginService.logout();
    this.router.navigate(['/']);
  }
  checkRoleAsAdmin(){
    return this.role === "ADMIN";
  }
  checkRoleAsEmployee(){
    return this.role === "EMPLOYEE";
  }

  employeeList(){
    this.router.navigate(['/employeelist']);
  }
  employeeHome(){
    this.router.navigate(['/employee']);
  }
  addEmployee(){
    this.router.navigate(['/addemployeeadmin']);
  }
  saveEmployee() {
    this.temp.firstName = this.employee.firstName;
    this.temp.lastName = this.employee.lastName;
    this.temp.job = this.employee.job;
    this.temp.salary = this.employee.salary;
    this.temp.email = this.employee.email;
    this.temp.role = this.employee.role;
    this.temp.id = this.employee.id;
    this.temp.password = this.employee.password;
    this.temp.active = false;
    this.employeeService.updateEmployee(this.temp.id,this.temp).subscribe(data => {
    },
      error => console.log(error));
  }
}
