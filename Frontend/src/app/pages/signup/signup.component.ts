import { Component ,OnInit} from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/classes/employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  public employee: Employee = new Employee();
  checkEmail: boolean=false;
  checkPassword: boolean=false;
  confirmPassword:any;
  
  constructor(private employeeService:EmployeeService, private router: Router){};

  async formSubmit() {
    if(this.employee.password !== this.confirmPassword ){
      this.checkPassword = true;
    }else{
     
    this.checkPassword = false;
    
    //checking for email exists or not 
    const emailExists: any = await this.employeeService.emailExists(this.employee.email).toPromise();
    this.checkEmail = emailExists;
    if (!emailExists) {
      this.saveEmployee();
      this.login();      
    } else {
      console.log("Email already exists!!!");
    }
  }
   }

  saveEmployee() {
    this.employeeService.addEmployee(this.employee).subscribe(data => {
    });
  }

  login(){
    this.router.navigate(['/login']);
  }
}
