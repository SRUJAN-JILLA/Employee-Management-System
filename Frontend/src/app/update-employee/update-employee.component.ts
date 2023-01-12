import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  employee: Employee = new Employee();
  email;
  check;

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
      this.email = this.employee.email;
    }, error => console.log(error));
  }

  async onSubmit() {

    //checking for email exists or not 
    const res: any = await this.employeeService.
      emailExists(this.employee.email).toPromise();
    this.check = res;
    if (!(res && this.email != this.employee.email)) {
      this.employeeService.updateEmployee(this.id, this.employee).subscribe(data => {
        this.goToEmployeeList();
      }
        , error => console.log(error));
    } else {
      console.log("Email already exists!!!");
    }
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
