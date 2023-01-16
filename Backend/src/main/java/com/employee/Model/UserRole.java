package com.employee.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "userRoles")
public class UserRole {
	
	@Transient
	public static final String SEQUENCE_NAME = "user_role_sequence";
	
	@Id
	private long userRoleId;
	
	private Employee employee;
	
	private Role role;
}
