import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee'
import { EmployeeService } from '../employee.service'
import { Router } from '@angular/router';
import {saveAs} from 'file-saver/dist/fileSaver';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employees: Employee[];
  public selected = 'Search by...';
  public searchArea = '';

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  downloadPdf(){
    this.employeeService.downloadPdf().subscribe(pdf =>{
      const fileName = "EmployeeList.pdf";
      saveAs(pdf,fileName);
   },err =>{
      console.log(err);
    })
  }

  getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      this.getEmployees();
    })
  }
  searchBy(){
    this.searchArea = this.selected + ":";
    }
}
