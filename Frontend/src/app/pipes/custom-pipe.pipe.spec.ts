import { Employee } from '../classes/employee';
import { CustomPipePipe } from './custom-pipe.pipe';

describe('CustomPipePipe', () => {
  const pipe = new CustomPipePipe();

  let employees: Employee[] = [{ "id": 100003, "firstName": "Srujan", "lastName": "Srujan", "salary": 900000.0, "email": "srujanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "EMPLOYEE", "active": false, "loginAttempts": 0, "notifications": [] },
  { "id": 100004, "firstName": "Sravan", "lastName": "Jilla", "salary": 800000.0, "email": "sravanjilla@gmail.com", "job": "HR", "password": "$2a$10$BW9L/gFvBBMVd3BNQTDznOUz59c9hgCkn4UZ8CxxgVk59vKkUJBNK", "role": "ADMIN", "active": true, "loginAttempts": 0, "notifications": [] }];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should search for salary', () => {
    let filterString: string = "salary:900000";
    expect(pipe.transform(employees, filterString)[0].id).toEqual(100003);
  });

  it('should search for active', () => {
    let filterString: string = "active:true";
    expect(pipe.transform(employees, filterString)[0].id).toEqual(100004);
  });

  it('should search normally by active', () => {
    let filterString: string = "true";
    expect(pipe.transform(employees, filterString)[0].id).toEqual(100004);
  });

  it('should search normally by firstname email lastname', () => {
    let filterString: string = "srujan";
    expect(pipe.transform(employees, filterString)[0].id).toEqual(100003);
  });

  it('should search normally by salary', () => {
    let filterString: string = "900000";
    expect(pipe.transform(employees, filterString)[0].id).toEqual(100003);
  });

  it('should search normally by salary', () => {
    let filterString: string = "HR";
    expect(pipe.transform(employees, filterString)[0].id).toEqual(100003);
  });
});
