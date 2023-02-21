package com.employee.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.AuthenticationException;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class JwtAuthenticationEntryPointTests {
	
	@Mock
	HttpServletRequest request;
	@Mock
	HttpServletResponse response;
	@Mock
	AuthenticationException authException;
	
	@InjectMocks
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	
//	@Test
//	void commence() throws IOException, ServletException {
//		this.jwtAuthenticationEntryPoint.commence(request,response, authException);
//		 response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized : Server")
//	}

}
