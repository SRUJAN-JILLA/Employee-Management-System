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
            console.log("success");
            console.log(data);

            this.loginService.loginUser(data.token);

            this.loginService.getCurrentUser().subscribe(
              (user:any)=>{
                this.loginService.setUser(user);

                 //redirect admin
                  console.log(user);
                  console.log(this.loginService.getUserRole())
                 if(this.loginService.getUserRole() == "ADMIN"){
                  this.employee();
                  console.log("you r in admin section")
                }else if (this.loginService.getUserRole() == "EMPLOYEE"){
                  this.employee();
                  console.log("you r in employee section")
                }else{
                  console.log("You are in logout section")
                  this.loginService.logout();
                }
              }
            )
          },(error)=>{
            console.log(error);
            alert("Invalid Details!!! Try again.");
            location.reload();
          }
        )

      
     } else {
      this.checkEmail = true;
      console.log("Email does not exists!!!");
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
    this.router.navigate(['/employee']);
  }
}
