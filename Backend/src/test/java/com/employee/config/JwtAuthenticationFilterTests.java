package com.employee.config;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.context.SecurityContextHolder;

import com.employee.Model.Employee;
import com.employee.Service.impl.UserDetailsServiceImpl;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class JwtAuthenticationFilterTests {

	@Mock
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@Mock
	private JwtUtil jwtUtil;

	@Mock
	SecurityContextHolder securityContextHolder;

	@InjectMocks
	JwtAuthenticationFilter jwtAuthenticationFilter;

	@Mock
	private Employee employee;

	@Mock
	private FilterChain filterChain;

	@BeforeEach
	public void setUp() {
		this.employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date(), new ArrayList<>());
	}
	
	/* Should test if filter for JWT is working or not */
	@Test
	void doFilterInternalTest() throws ServletException, IOException {
		HttpServletRequest request = mock(HttpServletRequest.class);
		HttpServletResponse response = mock(HttpServletResponse.class);
		FilterChain filterChain = mock(FilterChain.class);

		this.jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);
		verify(request).getHeader("Authorization");
	}
}