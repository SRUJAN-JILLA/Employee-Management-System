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

  public employees: Employee[];
  public selected = 'Search by...';
  public searchArea = '';
  public currentEmployee:Employee;
  public role:string;
  constructor(public loginService:LoginService, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(data=>{
      this.currentEmployee = data;
      this.role = this.currentEmployee.role;
    });
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  updateEmployee(id: number){
    this.router.navigate(['adminUpdateEmployee', id]);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      this.getEmployees();
    })
  }

  searchBy(){
    this.searchArea = this.selected + ":";
  }

  searchOption(option: string){
    this.searchArea = option+":";
  }

  download(value:string){
    if(value === "pdf"){
      this.downloadPdf();
    }else if(value === "excel"){
      this.downloadExcel();
    }else if(value === "csv"){
      this.downloadCsv();
    }
  }
    
  downloadExcel(){
    const fileName = "EmployeeList.xlsv";
      this.employeeService.download("excel").subscribe(xls =>{
      const blob = new Blob([xls]);
      const fileName = `Employees-list_${(new Date().toJSON().slice(0,10))}.xlsx`
      saveAs(blob, fileName)
    },
    error => {
      console.log('error');
    });
  }

  downloadCsv(){
    const fileName = "EmployeeList.csv";
    this.employeeService.download("csv").subscribe(csv =>{
    const blob = new Blob([csv], {type:'text/csv'});
    const fileName = `Employee-list_${(new Date().toJSON().slice(0,10))}.csv`
    saveAs(blob, fileName)
  },
  error => {
    console.log('error');
  });
  }

  downloadPdf(){
    this.employeeService.download("pdf").subscribe(pdf =>{
      const fileName = `Employee-list_${(new Date().toJSON().slice(0,10))}.pdf`;
      saveAs(pdf,fileName);
    },err =>{
      console.log(err);
    })
  }
  checkRoleAsAdmin(){
    return this.role === "ADMIN";
  }
  checkRoleAsEmployee(){
    return this.role === "EMPLOYEE";
  }
}
