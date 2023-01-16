package com.employee.Model;

import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "roles")
public class Role {
	
	
	@Id
	private String roleName;
	private Set<Long> userIdSet;

	public Role(String roleName, Set<Long> userIdSet) {
		super();
		this.roleName = roleName;
		this.userIdSet = userIdSet;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Set<Long> getUserIdSet() {
		return userIdSet;
	}

	public void setUserIdSet(Set<Long> userIdSet) {
		this.userIdSet = userIdSet;
	}

	public Role() {
		super();
	}

	@Override
	public String toString() {
		return "Role [roleName=" + roleName + ", userIdSet=" + userIdSet + "]";
	}
	
	

}
