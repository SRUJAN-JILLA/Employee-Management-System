package com.employee.Controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import com.employee.Model.Employee;
import com.employee.Service.EmployeeExcelExporter;
import com.employee.Service.EmployeePdfExporter;
import com.employee.Service.EmployeeService;
import com.lowagie.text.DocumentException;

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

	@GetMapping("/employees/emailExists/{email}")
	public boolean emailExists(@PathVariable("email") String email) {
		return employeeService.findByEmail(email);
	}

	// https://www.codejava.net/frameworks/spring-boot/export-data-to-excel-example
	@GetMapping("/employees/downloadExcel")
	public void downloadExcel(HttpServletResponse response) throws IOException {
		response.setContentType("application/octet-stream");
		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
		String currentDateTime = dateFormatter.format(new Date());

		String headerKey = "Content-Disposition";
		String headerValue = "attachment; filename=Employees_" + currentDateTime + ".xlsx";
		response.setHeader(headerKey, headerValue);

		List<Employee> listEmployee = this.employeeService.findAll();

		EmployeeExcelExporter employeeExcelExporter = new EmployeeExcelExporter(listEmployee);

		employeeExcelExporter.export(response);
	}
	
	//https://www.codejava.net/frameworks/spring-boot/pdf-export-example
	@GetMapping("/employees/downloadPdf")
	public void downloadPdf(HttpServletResponse response) throws DocumentException, IOException {

		response.setContentType("application/pdf");
		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
		String currentDateTime = dateFormatter.format(new Date());

		String headerKey = "Content-Disposition";
		String headerValue = "attachment; filename=Employees_" + currentDateTime + ".pdf";
		response.setHeader(headerKey, headerValue);

		List<Employee> listEmployee = this.employeeService.findAll();

		EmployeePdfExporter exporter = new EmployeePdfExporter(listEmployee);
		exporter.export(response);

	}

	//https://www.codejava.net/frameworks/spring-boot/csv-export-example
	@GetMapping("/employees/downloadCsv")
	public void downloadCsv(HttpServletResponse response) throws IOException {
		response.setContentType("text/csv");
		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
		String currentDateTime = dateFormatter.format(new Date());

		String headerKey = "Content-Disposition";
		String headerValue = "attachment; filename=Employees_" + currentDateTime + ".csv";
		response.setHeader(headerKey, headerValue);

		List<Employee> listEmployee = this.employeeService.findAll();

		ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
		String[] csvHeader = { "ID", "First Name", "Last Name", "E-mail", "Salary", "Job" };
		String[] nameMapping = { "id", "firstName", "lastName", "email", "salary", "job" };

		csvWriter.writeHeader(csvHeader);

		for (Employee employee : listEmployee) {
			csvWriter.write(employee, nameMapping);
		}

		csvWriter.close();

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
	//
	// query.addCriteria(Criteria.where("salary").gt(0));
	// return mongoTemplate.find(query, Employee.class);
	// }

}
