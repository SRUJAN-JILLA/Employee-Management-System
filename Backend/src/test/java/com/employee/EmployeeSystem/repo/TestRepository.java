package com.employee.EmployeeSystem.repo;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.employee.Model.Employee;
import com.employee.Repository.EmployeeRepository;

@SpringBootTest
public class TestRepository {

	@Autowired
	private EmployeeRepository employeeRepository;

	@BeforeEach
	public void beforeEach() {
		Employee temp = new Employee(1000000, "ftemp", "ltemp", 460000, "temp@gmail.com", "fse");
		this.employeeRepository.save(temp);
	}
	
	//add new Employee
	@Test
	public void addEmployee() {
		Employee temp = new Employee(10000001, "temp", "temp", 460000, "temp1@gmail.com", "fse");
		this.employeeRepository.save(temp);
		
		assertThat(temp.getEmail()).isEqualTo(this.employeeRepository.findById((long) 10000001).get().getEmail());
		
		//delete the added document
		this.employeeRepository.deleteById((long) 10000001);
	}
	
	//find By email
	@Test
	public void findByEmail() {
		Employee temp = this.employeeRepository.findByEmail("temp@gmail.com");
		
		assertThat(temp.getId()).isEqualTo(1000000);
	}
	
	//update 
	@Test
	public void updateEmail() {
		Employee temp = this.employeeRepository.findById((long) 1000000).get();
		temp.setEmail("update@gmail.com");
		this.employeeRepository.save(temp);
		
		assertThat("update@gmail.com").isEqualTo(this.employeeRepository.findById((long) 1000000).get().getEmail());
	}
	
	//delete 
	@Test
	public void deleteById() {
		this.employeeRepository.deleteById((long) 1000000);
		boolean actualValue = this.employeeRepository.existsById((long) 1000000);
		
		assertThat(actualValue).isEqualTo(false);
	}
	
	@AfterEach
	public void afterEach() {
		this.employeeRepository.deleteById((long) 1000000);
	}
}
