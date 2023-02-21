import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/classes/employee';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
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

  disableLoginButton:boolean;
  counter:number;
  currentLogginAttempts: number = 0;
  loginData={
    username:"",
    password:""
  }
  milliSecondsFromFailedAttempt:number = 0;

  constructor(private employeeService:EmployeeService,private loginService:LoginService, private route: ActivatedRoute, private router: Router){};

  async formSubmit(){
     //checking for email exists or not 
     const emailExists: any = await this.employeeService.emailExists(this.loginData.username).toPromise();
     
     //chcek if email exists 
     if (emailExists) {
      
       this.checkEmail = false;    
       this.checkPassword = false;

        //checking if the user is locked or unlocked
        this.getFailedLoginAttempt(this.loginData.username);
        await new Promise(resolve => setTimeout(resolve, 500  )).then(() => {});
        console.log(this.milliSecondsFromFailedAttempt);

        if(this.milliSecondsFromFailedAttempt > 30000){

        this.loginService.generateToken(this.loginData).subscribe(
          (data:any)=>{

            this.loginService.loginUser(data.token);

            this.loginService.getCurrentUser().subscribe(
              async (user: any) => {
                this.loginService.setUser(user);
                 if(this.loginService.getUserRole() == "ADMIN" || this.loginService.getUserRole() == "EMPLOYEE"){
                  this.changeActive();
                  this.setLoginAttempts(0);
                  await new Promise(resolve => setTimeout(resolve, 50)).then(() =>{});
                  this.employee();
                }else{
                  console.log("You are in logout section")
                  this.loginService.logout();
                }
              }
            )
          },async (error)=>{
            this.getLoginAttempts(this.loginData.username);
            await new Promise(resolve => setTimeout(resolve, 300)).then(() => {});
            if(this.currentLogginAttempts>3){
              console.log("U r in timer");
              this.disableLoginButton = true;
              this.setLockTime(this.loginData.username);
              await new Promise(resolve => setTimeout(resolve, 300)).then(() =>{});
              this.setLoginAttempts(0);
              this.counter = 30;
              let intervalId = setInterval(() => {
                this.counter = this.counter - 1;
                if(this.counter === 0){
                  clearInterval(intervalId);
                  this.disableLoginButton = false;
                } 
              }, 1000)
            }else{
              this.getLoginAttempts(this.loginData.username);
              await new Promise(resolve => setTimeout(resolve, 300)).then(() => {});
              alert("Invalid Details!\nYou have " + ( 4 - this.currentLogginAttempts ) + " more chances left!" );
              this.setLoginAttempts(this.currentLogginAttempts + 1);
            }
          }
        )}else{
          // account is locked 
          console.log("U r in locked timer")
          console.log(this.milliSecondsFromFailedAttempt);
          let timeLeft = 30000 - this.milliSecondsFromFailedAttempt;
          this.disableLoginButton = true;
          this.setLoginAttempts(0);
          this.counter = Math.floor(timeLeft/1000);
          let intervalId = setInterval(() => {
           this.counter = this.counter - 1;
            if(this.counter === 0){
              clearInterval(intervalId);
              this.disableLoginButton = false;
            } 
        }, 1000)
        }
     } else {
      this.checkEmail = true;
     }
  }

 getLoginAttempts(mail: string){
    this.employeeService.getLoginAttempts(mail).subscribe(data =>{
      this.currentLogginAttempts = data    
    })
  }

  setLoginAttempts(loginAttempts:number){
    let temp = new Employee;

    temp.email = this.loginData.username;
    temp.loginAttempts = loginAttempts;

    this.employeeService.setLoginAttempts(temp).subscribe(data =>{
    this.currentLogginAttempts = loginAttempts;
    });
  }

  getFailedLoginAttempt(mail:string){
    this.employeeService.getLockTimeLeft(mail).subscribe(data=>{
         this.milliSecondsFromFailedAttempt = data;
    })
  }

  setLockTime(mail:string){
    this.employeeService.setLockTime(mail).subscribe(data =>{
    })
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

  changeActive() {
    let temp:Employee = new Employee;

    temp.email = this.loginData.username;
    temp.active = true;
    this.employeeService.changeActiveByMail(temp.email,temp).subscribe(data => {
    },
      error => {});
  }
}