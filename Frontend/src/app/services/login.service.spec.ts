import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let loginService: LoginService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoginService
      ]
    });

    let store: any;
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : 'anothertoken';
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

    loginService = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });

  it('should generateToken', () => {
    loginService.getCurrentUser().subscribe(employee => {

      expect(employee).toBeTruthy('No Employee Returned.');
      expect(employee.id).toBeGreaterThan(1, 'Wrong Id returned')

    })
    const req = httpTestingController.expectOne('http://localhost:8080/current-user')
    expect(req.request.method).toEqual("GET");
    req.flush({ "id": 100003, "firstName": "Srujan", "lastName": "Jilla", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": false, "loginAttempts": 0, "lockTime": "2022-12-16T11:26:49.392+00:00", "enabled": true, "username": "srujanjilla@gmail.com", "authorities": [{ "authority": "ADMIN" }], "accountNonLocked": true, "accountNonExpired": true, "credentialsNonExpired": true });

  });

  it('should add new employee', () => {
    let loginData = {
      username: "srujanjilla@gmail.com",
      password: "safdasdasdf"
    }
    loginService.generateToken(loginData).subscribe(employee => {

      expect(employee).toBeTruthy('No Employee Returned.');

    })
    const req = httpTestingController.expectOne('http://localhost:8080/generate-token')
    expect(req.request.method).toEqual("POST");
    req.flush("Got token");

  });
});
