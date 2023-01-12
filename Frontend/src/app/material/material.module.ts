import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

const materialComponent = [MatToolbarModule];

@NgModule({
  imports: [materialComponent],
  exports: [materialComponent]
})
export class MaterialModule { }
