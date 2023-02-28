package com.employee.Controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.employee.Model.Employee;
import com.employee.Service.EmployeeService;

@CrossOrigin(origins = "*")
@RestController
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;

	/* Should return subscription for clients(browser) */
	@RequestMapping(value = "/subscribe", consumes = MediaType.ALL_VALUE)
	public SseEmitter subscribe() {
		return this.employeeService.subscribe();
	}

	/* Should return notifications based on id */
	@GetMapping("/employees/notifications/{id}")
	public List<String> getNotification(@PathVariable("id") long id) {
		return this.employeeService.getNotifications(id);
	}

	/* Should delete notifications based on id */
	@DeleteMapping("/employees/notifications/{id}")
	public void deleteNotifications(@PathVariable("id") long id) {
		this.employeeService.deleteNotifications(id);
	}

	/* Should return all employees */
	@GetMapping("/employees")
	public List<Employee> findAll() {
		return this.employeeService.findAll();
	}

	/* Should delete employee based on id */
	@DeleteMapping("/employees/{id}")
	public void deleteEmployee(@PathVariable("id") long id) {
		this.employeeService.deleteEmployee(id);
	}

	/* Should update the notifications after delete */
	@PutMapping("/employees/getNotificationsAfterDelete/{adminName}/{adminId}")
	public String addToNotiListAdminDeleteEmployee(@PathVariable("adminName") String adminName,
			@PathVariable("adminId") long adminId, @RequestBody List<Long> employeeIds) {
		return this.employeeService.addToNotiListAdminDeleteEmployee(adminName, adminId, employeeIds);
	}

	/* Should add an employee */
	@PostMapping("/employees/add/{adminName}/{adminId}")
	public String addEmployee(@RequestBody Employee employee, @PathVariable("adminName") String adminName,
			@PathVariable("adminId") long adminId) throws ParseException {
		return employeeService.addEmployee(employee, adminName, adminId);
	}

	/* Should change password based on id */
	@PutMapping("employees/changePassword/{id}")
	public String changePassword(@PathVariable("id") long id, @RequestBody Employee employee) {
		return this.employeeService.changePassword(id, employee);
	}

	/* Should change active based on id */
	@PutMapping("employees/changeActive/{id}")
	public void changeActive(@PathVariable("id") long id, @RequestBody Employee employee) {
		this.employeeService.changeActive(id, employee);
	}

	/* Should change active based on email */
	@PutMapping("employees/changeActive/mail/{mail}")
	public void changeActiveByEmail(@PathVariable("mail") String mail, @RequestBody Employee employee) {
		this.employeeService.changeActiveByMail(mail, employee);
	}

	/* Should update employee based on id */
	@PutMapping("employees/update/{id}/{adminName}/{adminId}/{employeeName}")
	public String employeeUpdate(@PathVariable("id") long id, @PathVariable("adminName") String adminName,
			@PathVariable("adminId") long adminId, @PathVariable("employeeName") String employeeName,
			@RequestBody Employee employee) {
		return this.employeeService.employeeUpdate(adminName, adminId, id, employee);
	}

	/* Should return if the email id exists or not */
	@GetMapping("/employees/emailExists/{email}")
	public boolean emailExists(@PathVariable("email") String email) {
		return employeeService.findByEmail(email);
	}

	/* Should get employee based on id */
	@GetMapping("/employees/{id}")
	public Employee findById(@PathVariable("id") long id) {
		return this.employeeService.findById(id);
	}

	/* Should return lock time based on mail */
	@GetMapping("/employees/lockTime/{mail}")
	public String setLockTime(@PathVariable("mail") String mail) {
		this.employeeService.setLockTime(mail);
		return "Locked";
	}

	/* Should return lock time left based on mail */
	@GetMapping("/employees/lockTimeLeft/{mail}")
	public long getLockTimeLeft(@PathVariable("mail") String mail) {
		return this.employeeService.getRestOfLockTime(mail);
	}

	/* Should return login attempts based on mail */
	@GetMapping("/employees/loginAttempts/{mail}")
	public long getLoginAttempts(@PathVariable("mail") String mail) {
		return this.employeeService.getLoginAttempts(mail);
	}

	/* Should change login attempts based */
	@PutMapping("/employees/loginAttempts")
	public void setLoginAttempts(@RequestBody Employee employee) {
		this.employeeService.changeLoginAttempts(employee);
	}

	/* Download in Pdf, csv or excel file */
	@GetMapping("/employees/download/{form}")
	public void download(@PathVariable("form") String form, HttpServletResponse response) throws IOException {
		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
		String currentDateTime = dateFormatter.format(new Date());
		String headerKey = "Content-Disposition";
		List<Employee> listEmployee = this.employeeService.findAll();
		if (form.equals("pdf")) {
			this.employeeService.downloadPdf(response, currentDateTime, headerKey, listEmployee);
		} else if (form.equals("excel")) {
			this.employeeService.downloadExcel(response, currentDateTime, headerKey, listEmployee);
		} else {
			this.employeeService.downloadCsv(response, currentDateTime, headerKey, listEmployee);
		}
	}
}