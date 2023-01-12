package com.employee.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.employee.Model.Employee;
import com.employee.Service.EmployeeService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@GetMapping("/employees")
	public List<Employee> findAll() {
		return this.employeeService.findAll();
	}

	@DeleteMapping("/employees/{id}")
	public void deleteEmployee(@PathVariable("id") long id) {
		this.employeeService.deleteEmployee(id);
	}

	@PutMapping("/employees/{id}")
	public void updateEmployee(@PathVariable("id") long id, @RequestBody Employee employeeDetails) {
		this.employeeService.updateEmployee(id, employeeDetails);
	}

	@GetMapping("employees/emailExists/{email}")
	public boolean emailExists(@PathVariable("email") String email) {
		return employeeService.findByEmail(email);
	}
	
	// Extra
	
	@GetMapping("/employees/{id}")
	public Employee findById(@PathVariable("id") long id) {
		return this.employeeService.findById(id);
	}

	@PostMapping("/employees")
	public String addEmployee(@RequestBody Employee employee) {
		return employeeService.addEmployee(employee);
	}
	
	@DeleteMapping("employees")
	public void deleteAll() {
		employeeService.deleteAll();
	}
	

	// Another way of fetching data using Mongo Template
	// @Autowired
	// MongoTemplate mongoTemplate;
	//
	// @GetMapping("/employees")
	// public List<Employee> getAllEmployees() {
	// Query query = new Query();
	// query.addCriteria(Criteria.where("salary").gt(0));
	// return mongoTemplate.find(query, Employee.class);
	// }

}
