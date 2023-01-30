import { Component } from '@angular/core';
import { Employee } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employe-admin',
  templateUrl: './add-employe-admin.component.html',
  styleUrls: ['./add-employe-admin.component.css']
})
export class AddEmployeAdminComponent {
  employee: Employee = new Employee();
  check:boolean;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.employee.role = "Choose a role"
  }

  async onSubmit() {

    //checking for email exists or not 
    const res: any = await this.employeeService.
      emailExists(this.employee.email).toPromise();
    this.check = res;
    if (!res) {
      this.employee.password = "56Password9333@3";
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
  
  async goToEmployeeList() {
    await new Promise(resolve => setTimeout(resolve, 500)).then(() => console.log("fired"));
    this.router.navigate(['/employeelist']);
  }

}
