import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/classes/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

  id: number=0;
  employee: Employee = new Employee();
  email:string="";
  check:boolean=false;
  temp: Employee = new Employee;
  currentEmployee:Employee = new Employee();
   test:boolean;
   res:any
  constructor(public loginService:LoginService, private employeeService:EmployeeService,private route: ActivatedRoute, private router: Router){};

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
      this.email = this.employee.email;
    });

    this.loginService.getCurrentUser().subscribe(data=>{
      this.currentEmployee = data;
    });
 
  }

  async onSubmit() {

    //checking for email exists or not 
     this.res = await this.employeeService.emailExists(this.employee.email).toPromise();
 
    this.check = this.res;
    if(this.checkSameOrNot()){
        this.router.navigate(['/employee']);
    }else{
              if(this.currentEmployee.email == this.employee.email){
                this.saveEmployee();
                this.goToEmployeeDashboard();
              }
              else if(this.currentEmployee.email != this.employee.email && !this.res){
                console.log(this.currentEmployee.email);
                console.log(this.employee.email);
                console.log(this.res);
                this.saveEmployee();
                alert("You will be logged out! Since you have changed Email!!")
                this.mainLogout();
              }
              else {
                // console.log("Email already exists!!!");
              }
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
    this.temp.active = false;
    
    this.employeeService.updateEmployee(this.temp.id,this.temp).subscribe(data => {
    });
  }
  
  async goToEmployeeDashboard() {
    await new Promise(resolve => setTimeout(resolve, 100)).then(() =>{});
    this.router.navigate(['/employee']);
  }

  checkRoleAsAdmin(){
    return this.currentEmployee.role === "ADMIN";
  }

  mainLogout(){
    this.loginService.logout();
    this.router.navigate(['/']);
  }

  checkSameOrNot(){
    return  (this.currentEmployee.firstName == this.employee.firstName && 
      this.currentEmployee.lastName == this.employee.lastName && 
      this.currentEmployee.email == this.employee.email && 
      this.currentEmployee.salary == this.employee.salary && 
      this.currentEmployee.job == this.employee.job && 
      this.currentEmployee.role == this.employee.role);
  }
}
