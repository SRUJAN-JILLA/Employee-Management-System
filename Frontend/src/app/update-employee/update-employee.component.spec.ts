import { TestBed } from '@angular/core/testing';

import { UpdateEmployeeComponent } from './update-employee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule} from '@angular/forms';
describe('UpdateEmployeeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UpdateEmployeeComponent
      ],imports: [FormsModule,HttpClientTestingModule,RouterTestingModule], 
      providers: [UpdateEmployeeComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UpdateEmployeeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});