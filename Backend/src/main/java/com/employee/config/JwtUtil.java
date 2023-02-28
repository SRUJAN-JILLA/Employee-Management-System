package com.employee.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
	private String SECRET_KEY = "secret";
	
	/* Should extract userName(email) from JWT token */
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	/* Should extract Expiration from JWT token */
	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}
	
	/* Should extract Claim from JWT token */
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	/* Should extract all Claims from JWT token */
	private Claims extractAllClaims(String token) {
		return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
	}
	
	/* Should check if token is expired or not from JWT token */
	private Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	/* Should generate token based on User Details */
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		return createToken(claims, userDetails.getUsername());
	}

	/* Should generate token based on Claims and Subject */
	private String createToken(Map<String, Object> claims, String subject) {
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
				.signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
	}

	/* Should validate JWT token based on User Details */
	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}
