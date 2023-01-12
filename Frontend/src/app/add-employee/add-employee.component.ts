import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  check;

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  async onSubmit() {

    //checking for email exists or not 
    const res: any = await this.employeeService.
      emailExists(this.employee.email).toPromise();
    this.check = res;
    if (!res) {
      this.saveEmployee();
      this.goToEmployeeList();      
    } else {
      console.log("Email already exists!!!");
    }
   }

  saveEmployee() {
    this.employeeService.addEmployee(this.employee).subscribe(data => {
    },
      error => console.log(error));
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
