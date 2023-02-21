import {Component, ViewChild, ElementRef,OnInit} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/classes/employee';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{

  employee:Employee;
  notificationList:string[] = [];
  
  @ViewChild('notification') notification: ElementRef;

  constructor(public loginService:LoginService, private employeeService:EmployeeService,private route: ActivatedRoute, private router: Router){};
  
  ngOnInit(): void {

    this.loginService.getCurrentUser().subscribe(data=>{
      this.employee = data;
      this.notificationList = data.notifications;
    },error => {});
    
    this.employeeService.getSubscription().subscribe({
      next: (event: string) => {
          this.ngOnInit();
      }
  });  

  }

  async deleteNotifications(){
    this.employeeService.deleteNotifications(this.employee.id).subscribe(data=>{
    });
    await new Promise(resolve => setTimeout(resolve, 300)).then(() => console.log("fired"));
    this.ngOnInit();
  }

  getNotificationLength():number{
    return this.notificationList.length;
  }

  setCount(count:string){
    localStorage.setItem("count", count);
  }
  getCount(){
    return localStorage.getItem("count");
  }
}