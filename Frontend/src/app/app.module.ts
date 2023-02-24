import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MainComponent } from './pages/main/main.component';
import { MaterialModule } from 'src/app/material/material.module';
import { authIntercepterProviders } from './services/auth.intercepter';
import { EmployeeDashboardComponent } from './pages/employee/employee-dashboard/employee-dashboard.component';
import { EmployeeListComponent } from './pages/admin/employee-list/employee-list.component';
import { SortDirective } from './directive/sort.directive';
import { CustomPipePipe } from './pipes/custom-pipe.pipe';
import { UpdateEmployeeComponent } from './pages/admin/update-employee/update-employee.component';
import { ChangePasswordComponent } from './pages/employee/change-password/change-password.component';
import { ErrorPageComponent } from './pages/employee/error-page/error-page.component';
import { CustomPipeForEmployeePipe } from './pipes/custom-pipe-for-employee.pipe';
import { PageNotFoundComponent } from './pages/employee/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    MainComponent,
    EmployeeDashboardComponent,
    EmployeeListComponent,
    SortDirective,
    CustomPipePipe,
    UpdateEmployeeComponent,
    ChangePasswordComponent,
    ErrorPageComponent,
    CustomPipeForEmployeePipe,
    PageNotFoundComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [authIntercepterProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
