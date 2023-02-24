package com.employee.Controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
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

@CrossOrigin(origins = "*", allowedHeaders="*")
@RestController
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;

	public EmployeeController(EmployeeService employeeService) {
		super();
		this.employeeService = employeeService;
	}

	@GetMapping("/employees")
	public List<Employee> findAll() {
		return this.employeeService.findAll();
	}

	@DeleteMapping("/employees/{id}")
	public void deleteEmployee(@PathVariable("id") long id) {
		System.out.println(id);
		this.employeeService.deleteEmployee(id);
	}

	@PostMapping("/employees/add")
	public String addEmployee(@RequestBody Employee employee) throws ParseException {
		return employeeService.addEmployee(employee);
	}

	@PutMapping("employees/changePassword/{id}")
	public String changePassword(@PathVariable("id") long id, @RequestBody Employee employee) {
		return this.employeeService.changePassword(id, employee);
	}

	@PutMapping("employees/changeActive/{id}")
	public String changeActive(@PathVariable("id") long id, @RequestBody Employee employee) {
		return this.employeeService.changeActive(id, employee);
	}

	@PutMapping("employees/changeActive/mail/{mail}")
	public String changeActiveByEmail(@PathVariable("mail") String mail, @RequestBody Employee employee) {
		return this.employeeService.changeActiveByMail(mail, employee);
	}

	@PutMapping("employees/update/{id}")
	public String employeeUpdate(@PathVariable("id") long id,@RequestBody Employee employee) {
		return this.employeeService.employeeUpdate( id, employee);
	}

	@GetMapping("/employees/emailExists/{email}")
	public boolean emailExists(@PathVariable("email") String email) {
		return employeeService.findByEmail(email);
	}

	@GetMapping("/employees/{id}")
	public Employee findById(@PathVariable("id") long id) {
		return this.employeeService.findById(id);
	}

	@GetMapping("/employees/lockTime/{mail}")
	public String setLockTime(@PathVariable("mail") String mail) {
		this.employeeService.setLockTime(mail);
		return "Locked";
	}

	@GetMapping("/employees/lockTimeLeft/{mail}")
	public long getLockTimeLeft(@PathVariable("mail") String mail) {
		return this.employeeService.getRestOfLockTime(mail);
	}

	// get Login attempts
	@GetMapping("/employees/loginAttempts/{mail}")
	public long getLoginAttempts(@PathVariable("mail") String mail) {
		return this.employeeService.getLoginAttempts(mail);
	}

	// set login attempts
	@PutMapping("/employees/loginAttempts")
	public String setLoginAttempts(@RequestBody Employee employee) {
		return this.employeeService.changeLoginAttempts(employee);
	}

	// Export all
	@GetMapping("/employees/download/{form}")
	public String download(@PathVariable("form") String form, HttpServletResponse response) throws IOException {
		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
		String currentDateTime = dateFormatter.format(new Date());
		String headerKey = "Content-Disposition";
		List<Employee> listEmployee = this.employeeService.findAll();

		if (form.equals("pdf")) {
			response.setContentType("application/pdf");
			String headerValue = "attachment; filename=Employees_" + currentDateTime + ".pdf";
			response.setHeader(headerKey, headerValue);
			EmployeePdfExporter exporter = new EmployeePdfExporter(listEmployee);
			exporter.export(response);

		} else if (form.equals("excel")) {
			String headerValue = "attachment; filename=Employees_" + currentDateTime + ".xlsx";
			response.setHeader(headerKey, headerValue);
			EmployeeExcelExporter employeeExcelExporter = new EmployeeExcelExporter(listEmployee);
			employeeExcelExporter.export(response);
		} else {
			response.setContentType("text/csv");
			String headerValue = "attachment; filename=Employees_" + currentDateTime + ".csv";
			response.setHeader(headerKey, headerValue);
			ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
			String[] csvHeader = { "ID", "First Name", "Last Name", "E-mail", "Salary", "Job" };
			String[] nameMapping = { "id", "firstName", "lastName", "email", "salary", "job" };

			csvWriter.writeHeader(csvHeader);

			for (Employee employee : listEmployee) {
				csvWriter.write(employee, nameMapping);
			}

			csvWriter.close();
		}
		return "Download";

	}

}
