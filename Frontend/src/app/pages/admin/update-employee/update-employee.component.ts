import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/classes/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

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

    if(this.currentEmployee.email == this.employee.email && this.currentEmployee.password == this.employee.password){
      this.saveEmployee();
      this.goToEmployeeDashboard();
    }
    else if(this.currentEmployee.email == this.employee.email && this.currentEmployee.password != this.employee.password){
      this.saveEmployee();
      alert("You will be logged out! Since you have changed Password!!")
      this.mainLogout();
    }
    else if(this.currentEmployee.email != this.employee.email && this.currentEmployee.password == this.employee.password && !res){
      this.saveEmployee();
      alert("You will be logged out! Since you have changed Email!!")
      this.mainLogout();
    }else if(this.currentEmployee.email != this.employee.email && this.currentEmployee.password != this.employee.password && !res){
      this.saveEmployee();
      alert("You will be logged out! \n Since you have changed both Email and Password!!")
      this.mainLogout();
    }
    else {
      console.log("Email already exists!!!");
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
    this.temp.password = this.employee.password;
    this.employeeService.updateEmployee(this.id,this.temp).subscribe(data => {
    },
      error => console.log(error));
  }
  
  async goToEmployeeDashboard() {
    await this.delay(1000);
    this.router.navigate(['/employee']);
  }

  delay(ms: number): Promise<any> {
    const dummyObservable = of();
    return dummyObservable.pipe(delay(ms)).toPromise();
  }
  checkRoleAsAdmin(){
    return this.currentEmployee.role === "ADMIN";
  }

  mainLogout(){
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
