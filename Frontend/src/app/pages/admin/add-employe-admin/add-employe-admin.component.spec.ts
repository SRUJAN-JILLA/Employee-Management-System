import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeAdminComponent } from './add-employe-admin.component';

describe('AddEmployeAdminComponent', () => {
  let component: AddEmployeAdminComponent;
  let fixture: ComponentFixture<AddEmployeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
