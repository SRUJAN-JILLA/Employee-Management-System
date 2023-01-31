package com.employee.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.employee.Model.Employee;
import com.employee.Repository.EmployeeRepository;

@SpringBootTest
public class EmployeeRepositoryTests {

	@Autowired
	private EmployeeRepository employeeRepository;

	@BeforeEach
	public void betoeEach() {
		Employee temp = new Employee(1, "ftemp", "ltemp", 460000, "temp@gmail.com", "fse", "56Password9333@3", "EMPLOYEE", true, 0);
		this.employeeRepository.save(temp);
	}

	// jUnit test to save Employee operation
	@Test
	public void saveEmployeeTest() {

		Employee temp = new Employee(2, "temp", "temp", 460000, "temp1@gmail.com", "fse", "56Password9333@3",
				"EMPLOYEE", true, 0);

		Employee savedEmployee = this.employeeRepository.save(temp);

		assertThat(savedEmployee).isNotNull();
		assertThat(savedEmployee.getId()).isGreaterThan(0);
		
		this.employeeRepository.deleteById((long) 2);
	}

	// jUnit test to get all employee operation
	@Test
	public void getAllEmployeesList() {

		List<Employee> employeeList = this.employeeRepository.findAll();

		assertThat(employeeList).isNotNull();
		assertThat(employeeList.size()).isGreaterThan(2);
	}

	// jUnit test to get employee by id
	@Test
	public void getEmployeeByIdTest() {

		Employee employeeDb = this.employeeRepository.findById((long) 1).get();

		assertThat(employeeDb).isNotNull();

	}

	// jUnit test to get Employee by email
	@Test
	public void getEmployeeByEmail() {
		
		Employee employeeDb = this.employeeRepository.findByEmail("temp@gmail.com");

		assertThat(employeeDb).isNotNull();
	}

	// jUnit test to delete employee
	@Test
	public void deleteEmployeeByIdTest() {
		Employee emp1 = new Employee(2, "temp", "temp", 460000, "temp1@gmail.com", "fse", "56Password9333@3", "EMPLOYEE", true, 0);

		this.employeeRepository.save(emp1);

		this.employeeRepository.deleteById((long) 2);
		boolean actualValue = this.employeeRepository.existsById((long) 2);

		assertThat(actualValue).isEqualTo(false);
	}
	
	// jUnit test to update employee
	@Test
	public void updateEmployeeTest() {

		Employee employeeDb = this.employeeRepository.findByEmail("temp@gmail.com");
		employeeDb.setEmail("newEmail@gmail.com");
		
		Employee updateedEmployee = this.employeeRepository.save(employeeDb);
		
		assertThat(updateedEmployee.getEmail()).isEqualTo("newEmail@gmail.com");
	}
	
	@AfterEach
	public void afterEach() {
		this.employeeRepository.deleteById((long) 1);
	}
}
