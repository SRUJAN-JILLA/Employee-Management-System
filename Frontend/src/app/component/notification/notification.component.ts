import { Component, ViewChild, ElementRef, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/classes/employee';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  employee: Employee;
  notificationList: string[] = [];

  @ViewChild('notification') notification: ElementRef;

  constructor(public loginService: LoginService, private employeeService: EmployeeService, private router: Router) { };

  ngOnInit(): void {

    this.loginService.getCurrentUser().subscribe(data => {
      this.employee = data;
      this.notificationList = data.notifications;
    });

    this.employeeService.getSubscription().subscribe({
      next: (event: string) => {
        this.ngOnInit();
      }
    });
  }

  /* Should delete notifications */
  async deleteNotifications() {
    this.employeeService.deleteNotifications(this.employee.id).subscribe(data => {
    });
    await new Promise(resolve => setTimeout(resolve, 300)).then(() => console.log(""));
    this.ngOnInit();
  }

  /* Should get notifications length*/
  getNotificationLength(): number {
    return this.notificationList.length;
  }
}