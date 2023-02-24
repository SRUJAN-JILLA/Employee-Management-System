package com.employee.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.security.Principal;
import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.employee.Controller.AuthenticateController;
import com.employee.Model.Employee;
import com.employee.Model.JwtRequest;
import com.employee.Service.impl.UserDetailsServiceImpl;
import com.employee.config.JwtUtil;

@ExtendWith(MockitoExtension.class)
public class AuthenticationControllerTests {

	@Mock
	private AuthenticationManager authenticationManager;

	private MockMvc mockMvc;

	@Mock
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@Mock
	private Principal principal;
	
	@Mock
	private JwtUtil jwtUtil;

	@InjectMocks
	private AuthenticateController authenticateController;
	
	@Mock
	JwtRequest jwtRequest;

	@BeforeEach
	public void setUp() {

		this.mockMvc = MockMvcBuilders.standaloneSetup(authenticateController).build();
	}

	@Test
	public void getCurrentEmployee() throws Exception {

		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());
		when(userDetailsServiceImpl.loadUserByUsername("thisemployee@gmail.com")).thenReturn(employee);

		Principal principal2 = new PrincipalImpl();

		Employee ans = this.authenticateController.getCurrentEmployee(principal2);

		assertThat(ans).isNotNull();
	}

	@Test
	public void generateToken() throws Exception {
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		when(userDetailsServiceImpl.loadUserByUsername("thisemployee@gmail.com")).thenReturn(employee);

		jwtRequest = new JwtRequest("thisemployee@gmail.com", "56Password9333@3");
		ResponseEntity<?> ans = this.authenticateController.generateToken(jwtRequest);

		assertThat(ans).isNotNull();
	}

}
