import { Component ,OnInit} from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/classes/employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public employee: Employee = new Employee();
  checkEmail: boolean;
  checkPassword: boolean;
  confirmPassword:any;

  constructor(private employeeService:EmployeeService,private route: ActivatedRoute, private router: Router){};

  ngOnInit(): void {}

  async formSubmit() {
    if(this.employee.password !== this.confirmPassword ){
      this.checkPassword = true;
      console.log("passwords don't mathch");
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
    console.log(this.employee)
    this.employeeService.addEmployee(this.employee).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
  }

  login(){
    this.router.navigate(['/login']);
  }
}
