package com.employee.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.employee.Model.Employee;
import com.employee.Repository.EmployeeRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private EmployeeRepository employeeRepository;

	/* Should return user based on userName(Email) */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Employee employee = this.employeeRepository.findByEmail(username);
		if (employee == null) {
			throw new UsernameNotFoundException("No user found!");
		}
		return employee;
	}
}