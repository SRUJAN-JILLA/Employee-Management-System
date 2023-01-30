import { CustomPipeForEmployeePipe } from './custom-pipe-for-employee.pipe';

describe('CustomPipeForEmployeePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomPipeForEmployeePipe();
    expect(pipe).toBeTruthy();
  });
});
