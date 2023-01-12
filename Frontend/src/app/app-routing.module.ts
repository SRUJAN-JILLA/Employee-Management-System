import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { HomeComponent } from './home/home.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

const routes: Routes = [
  {path: 'employees', component: EmployeeListComponent},
  {path: 'home', component: HomeComponent},
  { path: 'update-employee/:id', component: UpdateEmployeeComponent },
  { path: 'add-employee', component: AddEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],                                                                                                                                                                                                                                                                                                          
  exports: [RouterModule]
})
export class AppRoutingModule { }
