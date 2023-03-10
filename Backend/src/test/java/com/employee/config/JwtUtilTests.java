package com.employee.config;

import java.util.function.Function;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import io.jsonwebtoken.Claims;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class JwtUtilTests {
	
	private String SECRET_KEY = "secret";
	private String token;
	
	@Mock
	private Claims claims;
	
	@Mock
	Function<Claims, ?> claimsResolver;
	
	@InjectMocks
	private JwtUtil jwtUtil;
	
//	@Test
//	void extractClaims() {
//		when(Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws
//				(token).getBody()).thenReturn(any(Claims.class));
//		
//		Claims ans = this.jwtUtil.
//		
//	}
	
//	@Test
//	public void extractExpiration() {
//		when(this.jwtUtil.extractClaim(any(String.class),Function<Claims, T> )
//	}

}
