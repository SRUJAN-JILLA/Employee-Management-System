import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Employee } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-employe-admin',
  templateUrl: './add-employe-admin.component.html',
  styleUrls: ['./add-employe-admin.component.css']
})
export class AddEmployeAdminComponent {
  employee: Employee = new Employee();
  check:boolean;

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute, private router: Router) { }

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
  
  delay(ms: number): Promise<any> {
    const dummyObservable = of();
    return dummyObservable.pipe(delay(ms)).toPromise();
  }
  
  async goToEmployeeList() {
    await this.delay(500);
    this.router.navigate(['/employeelist']);
  }

}
