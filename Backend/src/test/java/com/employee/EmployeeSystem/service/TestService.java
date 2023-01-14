package com.employee.EmployeeSystem.service;

import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.employee.Repository.EmployeeRepository;
import com.employee.Service.EmployeeService;

@SpringBootTest
public class TestService {

	@Mock
	private EmployeeRepository employeeRepository;

	private EmployeeService employeeService;

	@BeforeEach
	public void setUp() {
		this.employeeService = new EmployeeService(this.employeeRepository);
	}

	@Test
	public void testRepo() {

		this.employeeService.findAll();
		verify(this.employeeRepository).findAll();
	}
}
