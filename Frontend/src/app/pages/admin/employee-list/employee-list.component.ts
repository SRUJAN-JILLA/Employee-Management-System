import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/classes/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];
  selected = 'Search by...';
  searchArea = '';
  currentEmployee: Employee = new Employee();
  role: string;
  tempEmployeeActive: Employee = new Employee;
  tempEmployeeUpdate: Employee = new Employee;
  currentPage: number = 1;
  listToDelete: number[] = [];
  enableDeleteButton: boolean;
  addEmployeeClicked: boolean;
  newEmployee: Employee = new Employee();
  checkEmail: boolean;
  checkUpdateEmployee: boolean;
  selectedIdToUpdate: number;
  checkEmailUpdate: boolean;
  allSelected: boolean;
  isAdmin:boolean = false;
  
  constructor(public loginService: LoginService, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(data => {
      this.currentEmployee = data;
      this.role = this.currentEmployee.role;
      this.isAdmin = this.role === "ADMIN"? true : false;
      this.saveEmployee();
    });

    this.employeeService.getSubscription().subscribe({
      next: (event: string) => {
        this.ngOnInit();
      }
    });

    this.isAdmin = this.checkRoleAsAdmin();
    this.getEmployees();
  }

 /* Update Employee Section */
  updateInline(id: number) {
    this.checkUpdateEmployee = true;
    this.selectedIdToUpdate = id;
  }

  /* Should update Employee*/
  async updateEmployeeCheck(selectedEmployee: Employee) {

    //checking for email exists or not 
    const res: any = await this.employeeService.emailExists(selectedEmployee.email).toPromise();

    this.checkEmailUpdate = res;

    this.saveUpdateEmployee(selectedEmployee);
    await new Promise(resolve => setTimeout(resolve, 150)).then(() => { });
    this.ngOnInit();
    this.checkUpdateEmployee = false;
  }

  /* Should save updated employee */
  saveUpdateEmployee(selectedEmployee: Employee) {
    this.tempEmployeeUpdate.firstName = selectedEmployee.firstName;
    this.tempEmployeeUpdate.lastName = selectedEmployee.lastName;
    this.tempEmployeeUpdate.job = selectedEmployee.job;
    this.tempEmployeeUpdate.salary = selectedEmployee.salary;
    this.tempEmployeeUpdate.email = selectedEmployee.email;
    this.tempEmployeeUpdate.role = selectedEmployee.role;
    this.tempEmployeeUpdate.id = selectedEmployee.id;
    this.tempEmployeeUpdate.active = selectedEmployee.active;
    this.tempEmployeeUpdate.loginAttempts = selectedEmployee.loginAttempts;

    this.employeeService.updateEmployee(this.tempEmployeeUpdate.id, this.tempEmployeeUpdate, this.currentEmployee.firstName
      , this.currentEmployee.id, this.tempEmployeeUpdate.firstName).subscribe(data => {
      });
  }

  /* Should disable current update employee */
  cancelUpdateEmployee() {
    this.checkUpdateEmployee = false;
    this.selectedIdToUpdate = 0;
  }

  /* Add New Employee Section */
  async addEmployeeCheck() {

    //checking for email exists or not 
    const res: any = await this.employeeService.
      emailExists(this.newEmployee.email).toPromise();
    this.checkEmail = res;
    if (!res) {
      this.newEmployee.password = "56Password9333@3";
      this.addSaveEmployee();

      await new Promise(resolve => setTimeout(resolve, 300)).then(() => { });
      this.ngOnInit();
      this.addEmployeeClicked = false;
      this.newEmployee = new Employee;
    }
  }

  /* Should save an employee */
  addSaveEmployee() {
    this.employeeService.addEmployee(this.newEmployee, this.currentEmployee.firstName, this.currentEmployee.id)
      .subscribe(data => {
      });
  }

  /* Should check if add employee is clicked or not */
  addEmployee() {
    if (!this.addEmployeeClicked)
      this.addEmployeeClicked = true;
    else {
      this.addEmployeeClicked = false;
      this.newEmployee = new Employee;
    }
  }

  /* Should hide add employee fields*/
  cancelAddEmployee() {
    this.addEmployeeClicked = false;
    this.newEmployee = new Employee;
  }

  /* Delete Multiple Employee Section */
  async deleteMultiple() {
    if (confirm("Are you sure!!\nDo you want to delete these employee(s)!!") == true) {
      if (this.allSelected == true) {
        this.listToDelete = [];
        this.employees.forEach((element) => {
          if (this.currentEmployee.id !== element.id)
            this.listToDelete.push(element.id);
        })
      }
      this.listToDelete.forEach(id => {
        this.employeeService.deleteEmployee(id).subscribe(data => {
        })
      })

      await new Promise(resolve => setTimeout(resolve, 1000)).then(() => { });
      this.getEmployees();
      this.employeeService.getNotificationsAfterDelete(
        this.currentEmployee.firstName, this.currentEmployee.id,
        this.listToDelete).subscribe(data => {
        })
      this.listToDelete = [];
    }
  }

  /* Should add to list in order to delete employees */
  eachSelected(event: any, id: number) {
    if ((event.target as HTMLInputElement).checked) {
      this.listToDelete.push(id);
    } else {
      const index = this.listToDelete.indexOf(id, 0);
      if (index > -1) {
        this.listToDelete.splice(index, 1);
      }
    }
  }

  /* Should check if all Employees are selected or not for deleting */
  allSelectedChange(event: any) {
    if ((event.target as HTMLInputElement).checked) {
      this.allSelected = true;
      this.listToDelete.push(0);
    } else {
      this.allSelected = false;
      this.listToDelete = [];
      this.enableDeleteButton = false;
    }
  }

  /* Get employees from DB */
  async getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  /* Search in Table Section */
  searchBy() {
    this.searchArea = this.selected + ":";
  }

  /* if Search option is choosen in Table Section */
  searchOption(option: string) {
    this.searchArea = option + ":";
  }

  /* Download Section */
  download(value: string) {
    if (value === "pdf") {
      this.downloadPdf();
    } else if (value === "excel") {
      this.downloadExcel();
    } else if (value === "csv") {
      this.downloadCsv();
    }
  }

  /* Download in Excel format */
  downloadExcel() {
    const fileName = "EmployeeList.xlsv";
    this.employeeService.download("excel").subscribe(xls => {
      const blob = new Blob([xls]);
      const fileName = `Employees-list_${(new Date().toJSON().slice(0, 10))}.xlsx`
      saveAs(blob, fileName)
    });
  }

  /* Download in CSV format */
  downloadCsv() {
    const fileName = "EmployeeList.csv";
    this.employeeService.download("csv").subscribe(csv => {
      const blob = new Blob([csv], { type: 'text/csv' });
      const fileName = `Employee-list_${(new Date().toJSON().slice(0, 10))}.csv`
      saveAs(blob, fileName)
    });
  }

  /* Download in PDF format */
  downloadPdf() {
    this.employeeService.download("pdf").subscribe(pdf => {
      const fileName = `Employee-list_${(new Date().toJSON().slice(0, 10))}.pdf`;
      saveAs(pdf, fileName);
    })
  }

  /* check if Role is admin or not */
  checkRoleAsAdmin() {
    return this.role === "ADMIN";
  }

  /* Should update employee active to true */
  saveEmployee() {
    this.tempEmployeeActive.active = true;
    this.employeeService.changeActive(this.currentEmployee.id, this.tempEmployeeActive).subscribe(data => {
    });
  }
}
