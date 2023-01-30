import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/classes/employee'; 
import { EmployeeService } from 'src/app/services/employee.service'; 
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { LoginService } from 'src/app/services/login.service';
import { HttpRequest } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];
  selected = 'Search by...';
  searchArea = '';
  currentEmployee:Employee= new Employee();
  role:string;
  temp: Employee = new Employee;
  tempUpdate: Employee = new Employee;
  p:number = 1;
  listToDelete:number[] = [];
  enableDeleteButton:boolean;
  addEmployeeClicked:boolean;
  newEmployee: Employee = new Employee();
  checkEmail:boolean;
  checkUpdateEmployee:boolean;
  selectedIdToUpdate:number;
  checkEmailUpdate:boolean;
  allSelected:boolean;

  constructor(public loginService:LoginService, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(data=>{
      this.currentEmployee = data;
      this.role = this.currentEmployee.role;
      this.saveEmployee();
    });
    this.getEmployees();
  }

  //Update Section
  updateInline(id:number){
    this.checkUpdateEmployee = true;
    this.selectedIdToUpdate = id;
  }

  async updateEmployeeCheck(selectedEmployee:Employee){
    
    //checking for email exists or not 
    const res: any = await this.employeeService.emailExists(selectedEmployee.email).toPromise();

    this.checkEmailUpdate = res;

    this.saveUpdateEmployee(selectedEmployee);
    await new Promise(resolve => setTimeout(resolve, 300)).then(() => console.log("fired"));
    this.ngOnInit();
    this.checkUpdateEmployee = false;
  }

  saveUpdateEmployee(selectedEmployee:Employee){
    this.tempUpdate.firstName = selectedEmployee.firstName;
    this.tempUpdate.lastName = selectedEmployee.lastName;
    this.tempUpdate.job = selectedEmployee.job;
    this.tempUpdate.salary = selectedEmployee.salary;
    this.tempUpdate.email = selectedEmployee.email;
    this.tempUpdate.role = selectedEmployee.role;
    this.tempUpdate.id = selectedEmployee.id;
    this.tempUpdate.active = selectedEmployee.active;
    
    console.log(this.tempUpdate);
    this.employeeService.updateEmployee(this.tempUpdate.id,this.tempUpdate).subscribe(data => {
    },
      error => console.log(error));
  }

  cancelUpdateEmployee(){
    this.checkUpdateEmployee = false;
    this.selectedIdToUpdate = 0;
  }

  //Add New Employee Section
  async addEmployeeCheck(){

    //checking for email exists or not 
    const res: any = await this.employeeService.
    emailExists(this.newEmployee.email).toPromise();
    this.checkEmail = res;
      if (!res) {
        this.newEmployee.password = "56Password9333@3";
        this.addSaveEmployee();
        await new Promise(resolve => setTimeout(resolve, 500)).then(() => console.log("fired"));
        this.ngOnInit();     
        this.addEmployeeClicked = false;
      } else {
        console.log("Email already exists!!!");
      }
  }

  addSaveEmployee() {
    this.employeeService.addEmployee(this.newEmployee).subscribe(data => {
    },
      error => console.log(error));
  }
  
  addEmployee(){
    if(!this.addEmployeeClicked)
    this.addEmployeeClicked = true;
    else
    this.addEmployeeClicked = false;
  }

  cancelAddEmployee(){
    this.addEmployeeClicked = false;
  }

  //Delete Multiple Employee Section
  async deleteMultiple(){
    if (confirm("Are you sure to delete these employees!!") == true) {
    if(this.allSelected == true){
        this.listToDelete = [];
        this.employees.forEach((element)=>{
          if(this.currentEmployee.id !== element.id)
          this.listToDelete.push(element.id);
        })
    }
    this.listToDelete.forEach(id =>{
      this.employeeService.deleteEmployee(id).subscribe( data => {
      })
    })
    await new Promise(resolve => setTimeout(resolve, 500)).then(() => console.log("fired"));
    this.getEmployees();
  }
  }

  eachSelected(event:any  ,id:number){
    if((event.target as HTMLInputElement).checked){
      this.listToDelete.push(id);
    }else{
      const index = this.listToDelete.indexOf(id, 0);
      if (index > -1) {
        this.listToDelete.splice(index, 1);
      }   
    }
    console.log(this.listToDelete);

  }

  allSelectedChange(event:any  ){
    if((event.target as HTMLInputElement).checked){
      this.allSelected = true;
      this.listToDelete.push(0);
    }else{
      this.allSelected = false;
      this.listToDelete = [];
      this.enableDeleteButton = false;
    }
  }

  //Get Data from DB
  async getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
    await new Promise(resolve => setTimeout(resolve, 500)).then(() => console.log("fired"));
  }

  //Search in Table Section
  searchBy(){
    this.searchArea = this.selected + ":";
  }

  searchOption(option: string){
    this.searchArea = option+":";
  }

  //Download Section
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

  //Navigation Part
  checkRoleAsAdmin(){
    return this.role === "ADMIN";
  }

  checkRoleAsEmployee(){
    return this.role === "EMPLOYEE";
  }

  saveEmployee() {
    this.temp.active = true;  
    this.employeeService.changeActive(this.currentEmployee.id, this.temp).subscribe(data => {
    },
      error => {});
  }

  //Old Way to update and delete code
  updateEmployee(id: number){
    this.router.navigate(['adminUpdateEmployee', id]);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      this.getEmployees();
    })
  }
}
