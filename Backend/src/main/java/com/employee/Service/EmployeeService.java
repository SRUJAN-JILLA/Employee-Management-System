package com.employee.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.employee.Model.Employee;
import com.employee.Repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private DbSequenceGenr dbSequenceGenr;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	// Getting Employee details
	public List<Employee> findAll() {
		return this.employeeRepository.findAll();
	}
	
	// Adding Employee
	public String addEmployee(Employee employee) throws ParseException {
		System.out.println(employee);

		// generate sequence and save employee data
		employee.setId(dbSequenceGenr.getSequenceNumber(Employee.SEQUENCE_NAME));

		if (employee.getRole() == null)
			employee.setRole("EMPLOYEE");
		
		employee.setPassword(this.bCryptPasswordEncoder.encode(employee.getPassword()));
	
		employee.setActive(false);
		
		employee.setLoginAttempts(0);

		
	    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");      
	    String date_string = "26-09-1989";
	    Date date = formatter.parse(date_string);    
		employee.setLockTime(date);
		
		System.out.println(employee);

		this.employeeRepository.save(employee);

		return "Added";

	}

	// Delete Employee
	public void deleteEmployee(long id) {
		this.employeeRepository.deleteById(id);
	}
	
	// set failed login attempt
	public String  setLockTime(String email) {
		Employee employee = this.employeeRepository.findByEmail(email);
		
		employee.setLockTime(new Date());
		
		this.employeeRepository.save(employee);
		return "Updated";
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
		
		return "Loggin Attempts Changed";
	}
	
	//get login attempts
	public long getLoginAttempts(String mail) {
		return this.employeeRepository.findByEmail(mail).getLoginAttempts();

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
		
		return "Active";
	}
	
	public String changeActiveByMail(String mail, Employee employee) {
		Employee tempEmployee = this.employeeRepository.findByEmail(mail);
		
		tempEmployee.setActive(employee.isActive());

		this.employeeRepository.save(tempEmployee);
		
		return "Active";
	}

	public String employeeUpdate( long id, Employee employee) {
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

	public Employee findById(long id) {
		return this.employeeRepository.findById(id).get();
	}

	// Used for testing purpose
	public EmployeeService(EmployeeRepository employeeRepository) {
		super();
		this.employeeRepository = employeeRepository;
	}

}
