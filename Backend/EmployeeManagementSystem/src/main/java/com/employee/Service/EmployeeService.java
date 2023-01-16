package com.employee.Service;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.Model.Employee;
import com.employee.Model.Role;
import com.employee.Repository.EmployeeRepository;
import com.employee.Repository.RoleRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private DbSequenceGenr dbSequenceGenr;

	// Getting Roles
	public List<Role> getRoles() {
		return this.roleRepository.findAll();
	}

	// Adding Role
	public String addRole(Role role) {
		role.setUserIdSet(new HashSet<>());
		this.roleRepository.save(role);
		return "Added";
	}

	// Getting Employee details
	public List<Employee> findAll() {
		return this.employeeRepository.findAll();
	}

	// Adding Employee
	public String addEmployee(Employee employee) {
		
		
		// generate sequence and save employee data
		employee.setId(dbSequenceGenr.getSequenceNumber(Employee.SEQUENCE_NAME));
		if(employee.getRole() == null)
		employee.setRole("EMPLOYEE");
		this.employeeRepository.save(employee);
		// updating role table about user id
		Role role = this.roleRepository.findById("EMPLOYEE").get();
		role.getUserIdSet().add(employee.getId());
		roleRepository.save(role);
		return "added";
	}

	// Delete Employee
	public void deleteEmployee(long id) {
		String role = this.employeeRepository.findById(id).get().getRole();
			Role roleObject = this.roleRepository.findById(role).get();
			Set<Long> useridSet = roleObject.getUserIdSet();
			useridSet.remove(id);
			roleObject.setUserIdSet(useridSet);
			this.roleRepository.save(roleObject);
		this.employeeRepository.deleteById(id);
	}

	
	public String employeeUpdate(long id , Employee employee) {
		System.out.println(employee);
		Employee tempEmployee = this.employeeRepository.findById(id).get();
		
		tempEmployee.setEmail(employee.getEmail());
		tempEmployee.setFirstName(employee.getFirstName());
		tempEmployee.setJob(employee.getJob());
		tempEmployee.setLastName(employee.getLastName());
		tempEmployee.setSalary(employee.getSalary());
		tempEmployee.setRole(employee.getRole());
		tempEmployee.setPassword(employee.getPassword());
		
		this.employeeRepository.save(tempEmployee);
		
		return "Updated";
	}
	public boolean findByEmail(String email) {
		return !(this.employeeRepository.findByEmail(email) == null);
	}

	public void deleteAll() {
		this.employeeRepository.deleteAll();
		List<Role> roles = this.roleRepository.findAll();

		for (int i = 0; i < roles.size(); i++) {
			Role role = roles.get(i);
			role.setUserIdSet(new HashSet<>());
			this.roleRepository.save(role);
		}
	}

	public Employee findById(long id) {
		return this.employeeRepository.findById(id).get();
	}

	// Used for testing purpose
	public EmployeeService(EmployeeRepository employeeRepository) {
		super();
		this.employeeRepository = employeeRepository;
	}
}
