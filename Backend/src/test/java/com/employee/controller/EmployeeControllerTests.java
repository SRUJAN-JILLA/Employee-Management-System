package com.employee.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.employee.Controller.EmployeeController;
import com.employee.Model.Employee;
import com.employee.Service.EmployeeService;

@ExtendWith(MockitoExtension.class)
public class EmployeeControllerTests {

	private MockMvc mockMvc;

	@Mock
	private EmployeeService employeeService;

	@InjectMocks
	private EmployeeController employeeController;

	@BeforeEach
	public void setUp() {
		this.mockMvc = MockMvcBuilders.standaloneSetup(employeeController).build();
	}

	@Test
	public void getAllEmployees() throws Exception {
		List<Employee> employees = new ArrayList<>();

		when(employeeService.findAll()).thenReturn(employees);

		RequestBuilder request = MockMvcRequestBuilders.get("/employees").accept(MediaType.APPLICATION_JSON);

		MvcResult result = mockMvc.perform(request).andExpect(status().isOk()).andExpect(content().json("[]"))
				.andReturn();
	}

	@Test
	public void getEmployeeByid() throws Exception {
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		when(employeeService.findById(1)).thenReturn(employee);

		RequestBuilder request = MockMvcRequestBuilders.get("/employees/" + employee.getId())
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(request).andExpect(status().isOk());
	}

	@Test
	public void deleteEmployeeById() throws Exception {
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		RequestBuilder request = MockMvcRequestBuilders.delete("/employees/" + employee.getId())
				.accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(request).andExpect(status().isOk());
	}

	@Test
	public void addEmployee() throws Exception {
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		when(employeeService.addEmployee(employee)).thenReturn("Added");

		String ans = this.employeeController.addEmployee(employee);

		assertThat(ans).isNotNull();
	}

	@Test
	public void changePassword() {
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		when(employeeService.changePassword(1, employee)).thenReturn("Password Updated");

		String ans = this.employeeController.changePassword(1, employee);

		assertThat(ans).isNotNull();

	}

	@Test
	public void changeActive() {
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		when(employeeService.changeActive(1, employee)).thenReturn("Active");

		String ans = this.employeeController.changeActive(1, employee);

		assertThat(ans).isNotNull();

	}

	@Test
	public void changeActiveByEmail() {
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		when(employeeService.changeActiveByMail("thisemployee@gmail.com", employee)).thenReturn("Active");

		String ans = this.employeeController.changeActiveByEmail("thisemployee@gmail.com", employee);

		assertThat(ans).isNotNull();

	}

	@Test
	public void employeeUpdate() {
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		when(employeeService.employeeUpdate(1, employee)).thenReturn("Updated");

		String ans = this.employeeController.employeeUpdate(1, employee);

		assertThat(ans).isNotNull();

	}

	@Test
	public void emailExists() {
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		when(employeeService.findByEmail("thisemployee@gmail.com")).thenReturn(true);

		Boolean ans = this.employeeController.emailExists("thisemployee@gmail.com");

		assertThat(ans).isNotNull();

	}

	@Test
	public void setLockTime() {
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		when(employeeService.setLockTime("thisemployee@gmail.com")).thenReturn("Updated");

		String ans = this.employeeController.setLockTime("thisemployee@gmail.com");

		assertThat(ans).isNotNull();
	}
	
	@Test
	public void getLockTimeLeft() {
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		when(employeeService.getRestOfLockTime("thisemployee@gmail.com")).thenReturn(1000L);

		Long ans = this.employeeController.getLockTimeLeft("thisemployee@gmail.com");

		assertThat(ans).isNotNull();
	}
	
	@Test
	public void getLoginAttempts() {
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		when(employeeService.getLoginAttempts("thisemployee@gmail.com")).thenReturn(1000L);

		Long ans = this.employeeController.getLoginAttempts("thisemployee@gmail.com");

		assertThat(ans).isNotNull();
	}
	
	@Test
	public void setLoginAttempts() {
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		when(employeeService.changeLoginAttempts(employee)).thenReturn("Updated");

		String ans = this.employeeController.setLoginAttempts(employee);

		assertThat(ans).isNotNull();
	}
	
	@Test
	public void downloadPdf() throws Exception {
		List<Employee> employees = new ArrayList<>();
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		employees.add(employee);
		when(employeeService.findAll()).thenReturn(employees);

		RequestBuilder request = MockMvcRequestBuilders.get("/employees/download/pdf").accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(request).andExpect(status().isOk());
	}
	
	@Test
	public void downloadExcel() throws Exception {
		List<Employee> employees = new ArrayList<>();
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		employees.add(employee);
		when(employeeService.findAll()).thenReturn(employees);

		RequestBuilder request = MockMvcRequestBuilders.get("/employees/download/excel").accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(request).andExpect(status().isOk());
	}
	
	@Test
	public void downloadcsv() throws Exception {
		List<Employee> employees = new ArrayList<>();
		Employee employee = new Employee(1, "fthis.employee", "lthis.employee", 460000, "thisemployee@gmail.com", "fse",
				"56Password9333@3", "EMPLOYEE", true, 0, new Date());

		employees.add(employee);
		when(employeeService.findAll()).thenReturn(employees);

		RequestBuilder request = MockMvcRequestBuilders.get("/employees/download/csv").accept(MediaType.APPLICATION_JSON);

		mockMvc.perform(request).andExpect(status().isOk());
	}

}
