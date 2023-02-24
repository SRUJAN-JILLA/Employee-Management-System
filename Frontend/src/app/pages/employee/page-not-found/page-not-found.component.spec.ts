import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NavbarComponent } from 'src/app/component/navbar/navbar.component';
import { MaterialModule } from 'src/app/material/material.module';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let router:any;
  let routerSpy:{navigate:jasmine.Spy};

  beforeEach(async () => {

    routerSpy= jasmine.createSpyObj(Router,{'navigate':of(true)});

    await TestBed.configureTestingModule({
      imports:[MaterialModule,HttpClientTestingModule],
      declarations:[PageNotFoundComponent,NavbarComponent],
      providers:[
        { provide: Router, useValue:routerSpy}
      ]
    })
    .compileComponents()
    .then(() =>{
      fixture = TestBed.createComponent(PageNotFoundComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to employee component', () => {
    fixture.debugElement.nativeElement.querySelector('button').click()
    fixture.detectChanges();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/employee']);
    expect(component).toBeTruthy();
  });
});
