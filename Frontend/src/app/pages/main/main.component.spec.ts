import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let router: Router;
  let routerSpy: { navigate: jasmine.Spy };
  let el: DebugElement;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj(Router, { 'navigate': of(true) });


    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [MainComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        router = TestBed.inject(Router);
        fixture.detectChanges();
      });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login component', () => {
    fixture.debugElement.nativeElement.querySelector('button').click()
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(component).toBeTruthy();
  });

});
