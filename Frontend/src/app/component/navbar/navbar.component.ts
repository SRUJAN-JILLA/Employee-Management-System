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
}
