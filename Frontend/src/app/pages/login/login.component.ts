import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/classes/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailAddress :string;
  confirmPassword:string;
  checkEmail: boolean;
  checkPassword: boolean;

  loginAttempts: number = 0;
  disableLoginButton:boolean;
  counter:number;
  loginData={
    username:"",
    password:""
  }

  constructor(private employeeService:EmployeeService,private loginService:LoginService, private route: ActivatedRoute, private router: Router){};

  async formSubmit(){
     //checking for email exists or not 
     const emailExists: any = await this.employeeService.emailExists(this.loginData.username).toPromise();
     
     //chcek if email exists 
     if (emailExists) {
     
       this.checkEmail = false;    
       this.checkPassword = false;
       
        this.loginService.generateToken(this.loginData).subscribe(
          (data:any)=>{

            this.loginService.loginUser(data.token);

            this.loginService.getCurrentUser().subscribe(
              (user: any) => {
                this.loginService.setUser(user);
                
                 if(this.loginService.getUserRole() == "ADMIN" || this.loginService.getUserRole() == "EMPLOYEE"){
                  this.employee();
                }else{
                  console.log("You are in logout section")
                  this.loginService.logout();
                }
              }
            )
          },async (error)=>{
            if(this.loginAttempts >2){
              this.disableLoginButton = true;
              this.loginAttempts = 0;
              this.counter = 30;
              let intervalId = setInterval(() => {
                this.counter = this.counter - 1;
                console.log(this.counter)
                if(this.counter === 0){
                  clearInterval(intervalId);
                  this.disableLoginButton = false;
                } 
            }, 1000)
            }else{
              alert("Invalid Details!\nYou have " + ( 3 - this.loginAttempts ) + " more chances left!" );
              this.loginAttempts = this.loginAttempts + 1;
            }
          }
        )
     } else {
      this.checkEmail = true;
     }
  }

  signup(){
    this.router.navigate(['/signup']);
  } 

  home(){
    this.router.navigate(['/home']);
  }

  admin(){
    this.router.navigate(['/admin'])}

  employee(){
    this.router.navigate(['/employeelist']);
  }
}
