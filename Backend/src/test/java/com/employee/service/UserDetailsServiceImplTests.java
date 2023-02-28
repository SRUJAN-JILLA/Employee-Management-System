package com.employee.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.employee.Model.Employee;
import com.employee.Repository.EmployeeRepository;
import com.employee.Service.impl.UserDetailsServiceImpl;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class UserDetailsServiceImplTests {

	@Mock
	private EmployeeRepository employeeRepository;

	@Mock
	private Employee employee;

	@InjectMocks
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@BeforeEach
	public void setUp() {
		this.employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date(), new ArrayList<>());
	}
	
	/* SHOULD test to load user by user name */
	@Test
	public void loadUserByUsername() throws UsernameNotFoundException {
		when(this.employeeRepository.findByEmail("thisemployee@gmail.com")).thenReturn(employee);

		UserDetails result = this.userDetailsServiceImpl.loadUserByUsername("thisemployee@gmail.com");

		assertThat(result).isNotNull();
		verify(this.employeeRepository).findByEmail("thisemployee@gmail.com");
	}

	/* should test for negative response */
	@Test
	public void loadUserByUsernameNegative() throws UsernameNotFoundException {
		when(this.employeeRepository.findByEmail("thisemployee@gmail.com")).thenReturn(null);

		assertThrows(UsernameNotFoundException.class, () -> {
			this.userDetailsServiceImpl.loadUserByUsername("thisemployee@gmail.com");
		});
		verify(this.employeeRepository).findByEmail("thisemployee@gmail.com");
	}
}
