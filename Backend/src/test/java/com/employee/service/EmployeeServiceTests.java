package com.employee.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.employee.Model.Employee;
import com.employee.Repository.EmployeeRepository;
import com.employee.Service.DbSequenceGenr;
import com.employee.Service.EmployeeService;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class EmployeeServiceTests {

	@Mock
	private EmployeeRepository employeeRepository;
	@Mock
	private DbSequenceGenr dbSequenceGenr;
	@Mock
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@InjectMocks
	private EmployeeService employeeService;

	@Mock
	private Employee employee;

	@BeforeEach
	public void setUp() {
		this.employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date(), new ArrayList<>());
	}
	
	/* Should test repository is valid or not */
	@Test
	public void testRepository() {
		this.employeeService.findAll();
		verify(this.employeeRepository).findAll();
	}

	/* should test to save Employee */
	@Test
	public void saveEmployee() throws ParseException {

		String ans = this.employeeService.addEmployee(this.employee, "sad", 0);

		assertThat(ans).isNotNull();
		verify(this.employeeRepository).save(this.employee);
		verify(this.dbSequenceGenr).getSequenceNumber(Employee.SEQUENCE_NAME);
		verify(this.bCryptPasswordEncoder).encode("56Password9333@3");
	}

	/* should test to save employee if role is null */
	@Test
	public void saveEmployeeRoleNull() throws ParseException {
		this.employee.setRole(null);
		String ans = this.employeeService.addEmployee(this.employee, "sd", 0);

		assertThat(ans).isNotNull();
		verify(this.employeeRepository).save(this.employee);
		verify(this.dbSequenceGenr).getSequenceNumber(Employee.SEQUENCE_NAME);
		verify(this.bCryptPasswordEncoder).encode("56Password9333@3");
	}

	/* should test to Get all employees */
	@Test
	public void getAllEMployees() {

		Employee employee2 = new Employee(2, "fthis.employee", "lthis.employee", 460000, "this.employee@gmail.com",
				"fse", "56Password9333@3", "EMPLOYEE", true, 0, new Date(), new ArrayList<>());
		this.employeeRepository.save(employee2);

		// checking for the methods used internally
		List<Employee> employees = this.employeeService.findAll();

		assertThat(employees).isNotNull();
		verify(this.employeeRepository).findAll();
	}
	
	/* Should test to delete an employee based on id */
	@Test
	public void deleteById() {

		this.employeeService.deleteEmployee(1);

		verify(this.employeeRepository).deleteById((long) 1);
	}

	/* should test to set failed login attempt */
	@Test
	public void setLocktime() {

		when(this.employeeRepository.findByEmail("thisemployee@gmail.com")).thenReturn(employee);

		this.employeeService.setLockTime("thisemployee@gmail.com");

		verify(this.employeeRepository).findByEmail("thisemployee@gmail.com");
		verify(this.employeeRepository).save(this.employee);
	}
	
	/* Should test to get rest of lock time */
	@Test
	public void getRestOfLockTime() {

		when(this.employeeRepository.findByEmail("thisemployee@gmail.com")).thenReturn(employee);

		long ans = this.employeeService.getRestOfLockTime("thisemployee@gmail.com");

		assertThat(ans).isNotNull();
		verify(this.employeeRepository).findByEmail("thisemployee@gmail.com");
	}
	
	/* Should test to change loggin attempts */
	@Test
	public void chagneLoginAttempts() {
		when(this.employeeRepository.findByEmail("thisemployee@gmail.com")).thenReturn(employee);

		String ans = this.employeeService.changeLoginAttempts(employee);

		assertThat(ans).isNotNull();
		verify(this.employeeRepository).findByEmail("thisemployee@gmail.com");
		verify(this.employeeRepository).save(this.employee);
	}
	
	/* Should test to change password */
	@Test
	public void changePassword() {

		when(this.employeeRepository.findById((long) 1)).thenReturn(Optional.of(employee));

		String ans = this.employeeService.changePassword((long) 1, employee);

		assertThat(ans).isNotNull();
		verify(this.employeeRepository).save(this.employee);
		verify(this.employeeRepository).findById((long) 1);

	}
	
	/* Should test to change active to true or false based on id */
	@Test
	public void changeActive() {
		when(this.employeeRepository.findById((long) 1)).thenReturn(Optional.of(employee));

		String ans = this.employeeService.changeActive((long) 1, employee);

		assertThat(ans).isNotNull();
		verify(this.employeeRepository).save(this.employee);
		verify(this.employeeRepository).findById((long) 1);

	}
	
	/* Should test to change active to true or false based on mail */
	@Test
	public void changeActiveByMail() {
		when(this.employeeRepository.findByEmail("thisemployee@gmail.com")).thenReturn(employee);

		String ans = this.employeeService.changeActiveByMail("thisemployee@gmail.com", employee);

		assertThat(ans).isNotNull();
		verify(this.employeeRepository).save(this.employee);
	}
	
	/* Should test to get login attempts */
	@Test
	public void getLoginAttempts() {
		when(this.employeeRepository.findByEmail("thisemployee@gmail.com")).thenReturn(employee);

		long ans = this.employeeService.getLoginAttempts("thisemployee@gmail.com");

		assertThat(ans).isNotNull();
	}
	
	/* Should test to update employee */
	@Test
	public void employeeUpdate() {
		when(this.employeeRepository.findById((long) 1)).thenReturn(Optional.of(employee));

		String ans = this.employeeService.employeeUpdate("SAdas", (long) 1, 0, employee);

		assertThat(ans).isNotNull();
	}
	
	/* Should test to find employee by mail*/
	@Test
	public void findByEmail() {
		when(this.employeeRepository.findByEmail("thisemployee@gmail.com")).thenReturn(employee);
		boolean ans = this.employeeService.findByEmail("thisemployee@gmail.com");
		assertThat(ans).isNotNull();
	}

	/* Should test to find employee by id */ 
	@Test
	public void findById() {
		when(this.employeeRepository.findById((long) 1)).thenReturn(Optional.of(employee));

		Employee ans = this.employeeService.findById((long) 1);

		assertThat(ans).isNotNull();
		verify(this.employeeRepository).findById((long) 1);
	}
}
