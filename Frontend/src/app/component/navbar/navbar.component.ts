import {Component, ViewChild, ElementRef} from '@angular/core'
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

  isAdmin:boolean;
  employee: Employee = new Employee();
  role:string;
  temp: Employee = new Employee;
  constructor(public loginService:LoginService, private employeeService:EmployeeService,
    private route: ActivatedRoute, private router: Router){};

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(data=>{
      this.employee = data;
      this.role = this.employee.role;
      this.loginService.saveFromNav(this.role);
    },error => {});

    this.employeeService.subscribe()
    .subscribe({
        next: (event) => {
        }
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

    this.temp.id = this.employee.id;
    this.temp.active = false;
    this.employeeService.changeActive(this.temp.id,this.temp).subscribe(data => {
    },
      error => {});
  } 
}
