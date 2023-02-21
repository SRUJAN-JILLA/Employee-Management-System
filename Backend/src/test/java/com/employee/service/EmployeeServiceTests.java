package com.employee.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

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
	@Mock
	List<Employee> employees;
	@Mock
	public List<SseEmitter> emitters;
	
	@Mock
	SseEmitter sseEmitter;


	@BeforeEach
	public void setUp() {
		this.employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse", "56Password9333@3", "EMPLOYEE", true, 0, new Date(),new ArrayList<>());
		this.employees.add(this.employee);
		this.employees.add(this.employee);
		
		this.emitters = new CopyOnWriteArrayList<>();
		sseEmitter = new SseEmitter(Long.MAX_VALUE);
		
		this.emitters.add(sseEmitter);
	}
	
	@Test
	public void testRepository() {
		this.employeeService.findAll();
		verify(this.employeeRepository).findAll();
	}	
	
	//save Employee
	@Test
	public void saveEmployee() throws ParseException {
		
		String ans = this.employeeService.addEmployee(this.employee,"nulll",0);
		
		assertThat(ans).isNotNull();
		verify(this.employeeRepository).save(this.employee);
		verify(this.dbSequenceGenr).getSequenceNumber(Employee.SEQUENCE_NAME);
		verify(this.bCryptPasswordEncoder).encode("56Password9333@3");
	}
	
	//save employee if role is null
	@Test
	public void saveEmployeeRoleNull() throws ParseException {
		this.employee.setRole(null);
		String ans = this.employeeService.addEmployee(this.employee,"nulll",0);
		
		assertThat(ans).isNotNull();
		verify(this.employeeRepository).save(this.employee);
		verify(this.dbSequenceGenr).getSequenceNumber(Employee.SEQUENCE_NAME);
		verify(this.bCryptPasswordEncoder).encode("56Password9333@3");
	}
	//Get all employees 
	@Test
	public void getAllEMployees() {
		
		Employee employee2  = new Employee(2, "fthis.employee", "lthis.employee", 460000, "this.employee@gmail.com", "fse", "56Password9333@3", "EMPLOYEE", true, 0, new Date(),new ArrayList<>());
		this.employeeRepository.save(employee2);
		
		//checking for the methods used internally
		List<Employee> employees = this.employeeService.findAll();
		
		assertThat(employees).isNotNull();
		verify(this.employeeRepository).findAll();
	}
	
	@Test
	public void deleteById() {
		Employee employee2  = new Employee(2, "fthis.employee", "lthis.employee", 460000, "this.employee@gmail.com", "fse", "56Password9333@3", "EMPLOYEE", true, 0, new Date(),new ArrayList<>());
		this.employeeRepository.save(employee2);
		 
		this.employeeService.deleteEmployee(1);
		
		verify(this.employeeRepository).deleteById((long) 1);
	}
	
	//set failed login attempt
	@Test
	public void setLocktime() {
		
		when(this.employeeRepository.findByEmail("thisemployee@gmail.com")).thenReturn(employee);
		
		this.employeeService.setLockTime("thisemployee@gmail.com");
		
		verify(this.employeeRepository).findByEmail("thisemployee@gmail.com");
		verify(this.employeeRepository).save(this.employee);
	}
	
	@Test
	public void getRestOfLockTime() {
		
		when(this.employeeRepository.findByEmail("thisemployee@gmail.com")).thenReturn(employee);
		
		long ans = this.employeeService.getRestOfLockTime("thisemployee@gmail.com");
		
		assertThat(ans).isNotNull();
		verify(this.employeeRepository).findByEmail("thisemployee@gmail.com");
	}
	
	@Test
	public void loginAttempts() {
		when(this.employeeRepository.findByEmail("thisemployee@gmail.com")).thenReturn(employee);
		
		String ans = this.employeeService.changeLoginAttempts(employee);
		
		assertThat(ans).isNotNull();
		verify(this.employeeRepository).findByEmail("thisemployee@gmail.com");
		verify(this.employeeRepository).save(this.employee);
	}
	
	@Test 
	public void changePassword() {
		
		when(this.employeeRepository.findById((long) 1)).thenReturn(Optional.of(employee));
		
		String ans = this.employeeService.changePassword((long)  1, employee);
		
		assertThat(ans).isNotNull();
		verify(this.employeeRepository).save(this.employee);
		verify(this.employeeRepository).findById((long) 1);

	}
	
	@Test
	public void changeActive() {
		when(this.employeeRepository.findById((long) 1)).thenReturn(Optional.of(employee));
		
		String ans = this.employeeService.changeActive((long)  1, employee);
		
		assertThat(ans).isNotNull();
		verify(this.employeeRepository).save(this.employee);
		verify(this.employeeRepository).findById((long) 1);

	}
	
	@Test
	public void changeActiveByMail() {
		when(this.employeeRepository.findByEmail("thisemployee@gmail.com")).thenReturn(employee);
		
		String ans = this.employeeService.changeActiveByMail("thisemployee@gmail.com",employee);
		
		assertThat(ans).isNotNull();
		verify(this.employeeRepository).save(this.employee);
	}
	
	@Test 
	public void getLoginAttempts() {
		when(this.employeeRepository.findByEmail("thisemployee@gmail.com")).thenReturn(employee);
		
		long ans = this.employeeService.getLoginAttempts("thisemployee@gmail.com");
		
		assertThat(ans).isNotNull();		
	}
	@Test
	public void employeeUpdate() {
		when(this.employeeRepository.findById((long) 1)).thenReturn(Optional.of(employee));
		
		String ans = this.employeeService.employeeUpdate("null",(long)0,(long) 1,employee);
		
		assertThat(ans).isNotNull();
	}
	
	@Test
	public void findByEmail() {
		when(this.employeeRepository.findByEmail("thisemployee@gmail.com")).thenReturn(employee);
		
		boolean ans = this.employeeService.findByEmail("thisemployee@gmail.com");
		
		assertThat(ans).isNotNull();
		
	}
	
	@Test
	public void findById() {
		when(this.employeeRepository.findById((long) 1)).thenReturn(Optional.of(employee));
		
		Employee ans = this.employeeService.findById((long) 1);
		
		assertThat(ans).isNotNull();
		verify(this.employeeRepository).findById((long) 1);
		
	}
	
//	@Test
//	public void subscribe() {
//		
//		SseEmitter sseEmitter = this.employeeService.subscribe();
//		assertThat(sseEmitter).isNotNull();
//	}
//	
//	@Test
//	public void addToNotiListAdminAddNewEmployee() {
//		
//		List<Employee> employees = new ArrayList<Employee>();
//		employees.add(this.employee);
//		employees.add(this.employee);
//		
//		when(this.employeeRepository.findAll()).thenReturn(employees);
////		when(this.employees.get(any(Integer.class))).thenReturn(this.employee);
//		when(this.employee.getRole().equals("ADMIN")).thenReturn(true);
//		String ans = this.employeeService.addToNotiListAdminAddNewEmployee("adminName", 1, "employeeName", 2);
//		
//		assertThat(ans).isNotNull();
//		verify(this.employeeRepository).findAll();
////		verify(this.employeeRepository).save(any(Employee.class));
//		
//	}
}
