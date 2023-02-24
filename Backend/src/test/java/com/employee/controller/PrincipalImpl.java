package com.employee.controller;

import java.security.Principal;

public class PrincipalImpl implements Principal{

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return "thisemployee@gmail.com";
	}

}
