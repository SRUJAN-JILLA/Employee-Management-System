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

  employees: Employee[] = [];
  selected = 'Search by...';
  searchArea = '';
  currentEmployee:Employee= new Employee();
  role:string="";
  temp: Employee = new Employee;
  tempUpdate: Employee = new Employee;
  p:number = 1;
  listToDelete:number[] = [];
  enableDeleteButton:boolean=false;
  addEmployeeClicked:boolean=false;
  newEmployee: Employee = new Employee();
  checkEmail:boolean=false;
  checkUpdateEmployee:boolean=false;
  selectedIdToUpdate:number=0;
  checkEmailUpdate:boolean=false;
  allSelected:boolean=false;
  test:boolean;
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

  updateEmployeeCheck(selectedEmployee:Employee){
    
    this.saveUpdateEmployee(selectedEmployee);
    // await new Promise(resolve => setTimeout(resolve, 300)).then(() => console.log("fired"));
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
    this.tempUpdate.loginAttempts = selectedEmployee.loginAttempts;
    
    console.log(this.tempUpdate);
    this.employeeService.updateEmployee(this.tempUpdate.id,this.tempUpdate).subscribe(data => {
    });
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
        console.log(this.newEmployee);

        await new Promise(resolve => setTimeout(resolve, 300)).then(() => console.log("fired"));
        this.ngOnInit();     
        this.addEmployeeClicked = false;
        this.newEmployee = new Employee;
      } else {
        console.log("Email already exists!!!");
      }
  }

  addSaveEmployee() {
    this.employeeService.addEmployee(this.newEmployee)
    .subscribe(data => {
    });
  }
  
  addEmployee(){
    if(!this.addEmployeeClicked)
    this.addEmployeeClicked = true;
    else{
    this.addEmployeeClicked = false;
    this.newEmployee = new Employee;
    }
  }

  cancelAddEmployee(){
    this.addEmployeeClicked = false;
    this.newEmployee = new Employee;
  }

  //Delete Multiple Employee Section
  async deleteMultiple(){
    if ((confirm("Are you sure!!\nDo you want to delete these employee(s)!!") == true) || this.test == false) {
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
    await new Promise(resolve => setTimeout(resolve, 300)).then(() => console.log("fired"));
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
  }

  //Search in Table Section
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
    });
  }

  downloadCsv(){
    const fileName = "EmployeeList.csv";
    this.employeeService.download("csv").subscribe(csv =>{
    const blob = new Blob([csv], {type:'text/csv'});
    const fileName = `Employee-list_${(new Date().toJSON().slice(0,10))}.csv`
    saveAs(blob, fileName)
  });
  }

  downloadPdf(){
    this.employeeService.download("pdf").subscribe(pdf =>{
      const fileName = `Employee-list_${(new Date().toJSON().slice(0,10))}.pdf`;
      if(this.test == false)
      saveAs(pdf,fileName);
    })
  }

  //Navigation Part
  checkRoleAsAdmin(){
    return this.role === "ADMIN";
  }
  
  saveEmployee() {
    this.temp.active = true;  
    this.employeeService.changeActive(this.currentEmployee.id, this.temp).subscribe(data => {
    });
  }
}
