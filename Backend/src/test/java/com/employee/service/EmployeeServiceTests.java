package com.employee.service;

import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import  org.mockito.Mockito;
import  org.mockito.BDDMockito;

import org.springframework.boot.test.context.SpringBootTest;

import com.employee.Model.Employee;
import com.employee.Repository.EmployeeRepository;
import com.employee.Service.EmployeeService;

@SpringBootTest
public class EmployeeServiceTests {

	private EmployeeRepository employeeRepository;

	private EmployeeService employeeService;
	
	@BeforeEach
	public void setUp() {
		this.employeeRepository = Mockito.mock(EmployeeRepository.class);
		this.employeeService = new EmployeeService(this.employeeRepository);
	}
	
	@Test
	public void testRepo() {
		
		this.employeeService.findAll();
		verify(this.employeeRepository).findAll();
	}	
	
	@Test
	public void saveEmployee() {
		Employee temp = new Employee(1, "ftemp", "ltemp", 460000, "temp@gmail.com", "fse", "56Password9333@3", "EMPLOYEE", true, 0);
		this.employeeRepository.save(temp);
		
//		BDDMockito.given()
	}
	
}
//
//@Mock
//private EmployeeRepository employeeRepository;
//
//private EmployeeService employeeService;
//
//@BeforeEach
//public void setUp() {
//	this.employeeService = new EmployeeService(this.employeeRepository);
//}
//
//@Test
//public void testRepo() {
//
//	this.employeeService.findAll();
//	verify(this.employeeRepository).findAll();
//}	