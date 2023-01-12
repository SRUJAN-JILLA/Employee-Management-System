package com.employee.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.Model.Employee;
import com.employee.Repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private SequenceGeneratorService service;
	
	public List<Employee> findAll() {
		return this.employeeRepository.findAll();
	}

	public void deleteEmployee(long id) {
		this.employeeRepository.deleteById(id);
	}

	public void updateEmployee(long id, Employee employeeDetails) {
		Employee employee = this.findById(id);

		employee.setEmail(employeeDetails.getEmail());
		employee.setFirstName(employeeDetails.getFirstName());
		employee.setLastName(employeeDetails.getLastName());
		employee.setJob(employeeDetails.getJob());
		employee.setSalary(employeeDetails.getSalary());

		this.employeeRepository.save(employee);
	}

	public boolean findByEmail(String email) {
		return !(this.employeeRepository.findByEmail(email) == null);
	}

	public String addEmployee(Employee employee) {
		employee.setId(service.getSequenceNumber("user_sequence"));
		this.employeeRepository.save(employee);
		return "added";
	}

	// Used for testing purpose
	public EmployeeService(EmployeeRepository employeeRepository) {
		super();
		this.employeeRepository = employeeRepository;
	}

	// Extra

	public void deleteAll() {
		this.employeeRepository.deleteAll();
	}

	public Employee findById(long id) {
		return this.employeeRepository.findById(id).get();
	}

}
