import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/admin/employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './pages/admin/update-employee/update-employee.component';
import { ChangePasswordComponent } from './pages/employee/change-password/change-password.component';
import { EmployeeDashboardComponent } from './pages/employee/employee-dashboard/employee-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EmployeeGuard } from './services/employee.guard';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
  },
  {
    path: 'employee',
    component: EmployeeDashboardComponent,
    pathMatch: 'full',
    canActivate: [EmployeeGuard],
  },
  {
    path: 'employeelist',
    component: EmployeeListComponent,
    pathMatch: 'full',
    canActivate: [EmployeeGuard],
  },
  {
    path: 'updateEmployee/:id',
    component: UpdateEmployeeComponent,
    pathMatch: 'full',
    canActivate: [EmployeeGuard],
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    pathMatch: 'full',
    canActivate: [EmployeeGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
