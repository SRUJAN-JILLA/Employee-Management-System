package com.employee.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

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

		if (employee.getRole() == null)
			employee.setRole("EMPLOYEE");

		employee.setPassword(this.bCryptPasswordEncoder.encode(employee.getPassword()));

		employee.setActive(false);
		
		employee.setLoginAttempts(0);
		
		employee.setLockTime(new Date(2021,1,1));

		System.out.println(employee);

		this.employeeRepository.save(employee);

		return "Added";

	}

	// Delete Employee
	public void deleteEmployee(long id) {
		this.employeeRepository.deleteById(id);
	}
	
	// set failed login attempt
	public void setLockTime(String email) {
		Employee employee = this.employeeRepository.findByEmail(email);
		
		employee.setLockTime(new Date());
		
		this.employeeRepository.save(employee);
	}
	
	//get how much time left to remove lock in time
	public long getRestOfLockTime(String email) {
		Employee employee = this.employeeRepository.findByEmail(email);
		
		long lockTimeInMillis = employee.getLockTime().getTime();
		long currentTimeInMillis = System.currentTimeMillis();
		
		return currentTimeInMillis - lockTimeInMillis;
	}

	// change login attempts 
	public String changeLoginAttempts(Employee employee) {
		
		Employee temp = this.employeeRepository.findByEmail(employee.getEmail());
		
		temp.setLoginAttempts(employee.getLoginAttempts());
		
		this.employeeRepository.save(temp);		
		
		return "Loggin Attempts " + employee.getLoginAttempts();
	}
	
	public String changePassword(long id, Employee employee) {
		Employee tempEmployee = this.employeeRepository.findById(id).get();
		
		if(employee.getPassword() != null)
			tempEmployee.setPassword(this.bCryptPasswordEncoder.encode(employee.getPassword()));
		
		tempEmployee.setActive(employee.isActive());
		this.employeeRepository.save(tempEmployee);

		return "Password Updated";
	}
	
	public String changeActive(long id, Employee employee) {
		Employee tempEmployee = this.employeeRepository.findById(id).get();
		
		tempEmployee.setActive(employee.isActive());

		this.employeeRepository.save(tempEmployee);
		
		return "Active" + employee.isActive();
	}
	
	public String changeActiveByMail(String mail, Employee employee) {
		Employee tempEmployee = this.employeeRepository.findByEmail(mail);
		
		tempEmployee.setActive(employee.isActive());

		this.employeeRepository.save(tempEmployee);
		
		return "Active" + employee.isActive();
	}

	public String employeeUpdate(long id, Employee employee) {
		System.out.println(employee);
		Employee tempEmployee = this.employeeRepository.findById(id).get();
		String role = tempEmployee.getRole();

		tempEmployee.setEmail(employee.getEmail());
		tempEmployee.setFirstName(employee.getFirstName());
		tempEmployee.setJob(employee.getJob());
		tempEmployee.setLastName(employee.getLastName());
		tempEmployee.setSalary(employee.getSalary());
		tempEmployee.setRole(employee.getRole());
		tempEmployee.setActive(employee.isActive());
		tempEmployee.setLoginAttempts(employee.getLoginAttempts());
		
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

//to update the rolerepository
//this.employeeRepository.save(tempEmployee);

// update in Role repository
// need to work on this ->
//if(!role.equals(employee.getRole())) {
////delete it in existing Role object
//Role roleObject = this.roleRepository.findById(role).get();
//Set<Long> useridSet = roleObject.getUserIdSet();
//useridSet.remove(id);
//roleObject.setUserIdSet(useridSet);
//System.out.println(roleObject);
//
//this.roleRepository.save(roleObject);
//
////adding it in new Role object
//Role newRoleObject = this.roleRepository.findById(employee.getRole()).get();
//Set<Long> newUseridSet = roleObject.getUserIdSet();
//System.out.println(newUseridSet + "before adding the new role");
//
//newUseridSet.add(employee.getId());
//
//newRoleObject.setUserIdSet(newUseridSet);
//System.out.println(newRoleObject);
//
//this.roleRepository.save(newRoleObject);
//}


//to delete the role
//String role = this.employeeRepository.findById(id).get().getRole();
//Role roleObject = this.roleRepository.findById(role).get();
//Set<Long> useridSet = roleObject.getUserIdSet();
//useridSet.remove(id);
//roleObject.setUserIdSet(useridSet);
//this.roleRepository.save(roleObject);

//adding role
// updating role table about user id
//Role role = this.roleRepository.findById("EMPLOYEE").get();
//role.getUserIdSet().add(employee.getId());
//roleRepository.save(role);

//delete multiple employees
//public void deleteMultiple(long[] ids) {
//	for(int i=0;i<ids.length;i++) {
//		this.employeeRepository.deleteById(ids[i]);
//	}
//	System.out.println(ids);
//}