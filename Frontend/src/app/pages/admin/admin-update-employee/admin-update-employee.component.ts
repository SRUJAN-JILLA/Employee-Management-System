import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Employee } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-admin-update-employee',
  templateUrl: './admin-update-employee.component.html',
  styleUrls: ['./admin-update-employee.component.css']
})
export class AdminUpdateEmployeeComponent {
  id: number;
  employee: Employee = new Employee();
  email:string
  check:boolean;
  temp: Employee = new Employee;
  currentEmployee:Employee = new Employee();

  constructor(public loginService:LoginService, private employeeService:EmployeeService,private route: ActivatedRoute, private router: Router){};

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
      this.email = this.employee.email;
    }, error => console.log(error));

    this.loginService.getCurrentUser().subscribe(data=>{
      this.currentEmployee = data;
    });
  }

  async onSubmit() {
      
    //checking for email exists or not 
    const res: any = await this.employeeService.emailExists(this.employee.email).toPromise();

    this.check = res;

    if(this.email == this.employee.email){
    this.saveEmployee();
    this.goToEmployeeList();
    }
    else if(this.email != this.employee.email && this.currentEmployee.email == this.email && !res){
      this.saveEmployee();
      alert("You will be logged out! \nSince you have changed your own Email!!")
      this.mainLogout();
    }
    else if(this.email != this.employee.email && !res){
      this.saveEmployee();
      this.goToEmployeeList();
    }
  }

  saveEmployee() {
    this.temp.firstName = this.employee.firstName;
    this.temp.lastName = this.employee.lastName;
    this.temp.job = this.employee.job;
    this.temp.salary = this.employee.salary;
    this.temp.email = this.employee.email;
    this.temp.role = this.employee.role;
    this.temp.id = this.employee.id;
    this.temp.active = this.employee.active;
    
    console.log(this.temp);
    this.employeeService.updateEmployee(this.id,this.temp).subscribe(data => {
    },
      error => console.log(error));
  }
  
  async goToEmployeeList() {
    await this.delay(3000);
    this.router.navigate(['/employeelist']);
  }

  delay(ms: number): Promise<any> {
    const dummyObservable = of();
    return dummyObservable.pipe(delay(ms)).toPromise();
  }
  checkRoleAsAdmin(){
    return this.currentEmployee.role === "ADMIN";
  }
  mainLogout(){
    this.temp.firstName = this.employee.firstName;
    this.temp.lastName = this.employee.lastName;
    this.temp.job = this.employee.job;
    this.temp.salary = this.employee.salary;
    this.temp.email = this.employee.email;
    this.temp.role = this.employee.role;
    this.temp.id = this.employee.id;
    this.temp.password = this.employee.password;
    this.temp.active = false;
    console.log(this.temp);
    this.employeeService.updateEmployee(this.id,this.temp).subscribe(data => {
    },
      error => console.log(error));
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
