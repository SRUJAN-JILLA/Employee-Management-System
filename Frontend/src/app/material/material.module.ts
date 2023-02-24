import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from '@angular/forms';

const materialComponent = [FormsModule,RouterTestingModule,MatToolbarModule,MatSelectModule,MatIconModule];

@NgModule({
  imports: [materialComponent],
  exports: [materialComponent]
})
export class MaterialModule { }
