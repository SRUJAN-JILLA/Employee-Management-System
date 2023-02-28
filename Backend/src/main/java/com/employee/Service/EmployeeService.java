package com.employee.Service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import com.employee.Model.Employee;
import com.employee.Repository.EmployeeRepository;
import com.lowagie.text.DocumentException;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private DbSequenceGenr dbSequenceGenr;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

	/* Should return subscription to clients(browser) */
	public SseEmitter subscribe() {

		SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
		try {
			sseEmitter.send(SseEmitter.event().name("INIT"));
		} catch (IOException e) {
			e.printStackTrace();
			emitters.remove(sseEmitter);
		}
		sseEmitter.onCompletion(() -> {
			emitters.remove(sseEmitter);
		});

		emitters.add(sseEmitter);
		return sseEmitter;
	}

	/* Should send events to clients */
	public void sendEmitters() {
		synchronized (this.emitters) {
			for (int i = 0; i < emitters.size(); i++) {
				SseEmitter emitter = emitters.get(i);
				emitter.onCompletion(() -> {
					emitters.remove(emitter);
				});
				try {
					emitter.send(SseEmitter.event().name("notifications").data("fired"));
				} catch (IOException e) {
					emitters.remove(emitter);
				}
			}
		}
	}

	/* Add to notification list of admin employees when a new user gets added */
	public String addToNotiListAdminAddNewEmployee(String adminName, long adminId, String employeeName,
			long employeeId) {
		List<Employee> employees = this.employeeRepository.findAll();

		for (int i = 0; i < employees.size(); i++) {
			Employee temp = employees.get(i);

			if (temp.getRole().equals("ADMIN") && temp.isActive() == true) {

				List<String> notifications = temp.getNotifications();
				notifications.add(adminName + "(" + adminId + ") has added a new Employee " + employeeName + "("
						+ employeeId + ").");

				temp.setNotifications(notifications);

				this.employeeRepository.save(temp);
			}
		}

		/* Send events to clients */
		sendEmitters();

		for (int i = 0; i < employees.size(); i++) {
			Employee temp = employees.get(i);

			if (temp.getRole().equals("ADMIN") && temp.isActive() == false) {

				List<String> notifications = temp.getNotifications();
				notifications.add(adminName + "(" + adminId + ") has added a new Employee " + employeeName + "("
						+ employeeId + ").");

				temp.setNotifications(notifications);

				this.employeeRepository.save(temp);
			}
		}
		return "Added to Notification list(Added) to all admins";
	}

	/* Add to notification list of admin employees when a new user gets deleted */
	public String addToNotiListAdminDeleteEmployee(String adminName, long adminId, List<Long> employeeIds) {
		List<Employee> employees = this.employeeRepository.findAll();

		for (int i = 0; i < employees.size(); i++) {
			Employee temp = employees.get(i);
			if (temp.getRole().equals("ADMIN") && temp.isActive() == true) {
				List<String> notifications = temp.getNotifications();
				for (int j = 0; j < employeeIds.size(); j++) {
					notifications.add(
							adminName + "(" + adminId + ") has deleted an Employee " + "(" + employeeIds.get(j) + ").");
				}
				temp.setNotifications(notifications);

				this.employeeRepository.save(temp);
			}
		}

		/* Send events to clients */
		sendEmitters();

		for (int i = 0; i < employees.size(); i++) {
			Employee temp = employees.get(i);
			if (temp.getRole().equals("ADMIN") && temp.isActive() == false) {
				List<String> notifications = temp.getNotifications();
				for (int j = 0; j < employeeIds.size(); j++) {
					notifications.add(
							adminName + "(" + adminId + ") has deleted an Employee " + "(" + employeeIds.get(j) + ").");
				}
				temp.setNotifications(notifications);

				this.employeeRepository.save(temp);
			}
		}
		return "Added to Notification list(deleted) to all admins";
	}

	/* Add to notification list of employee when details get updated */
	public String addToNotiListAdminUpdateEmployee(String adminName, long adminId, long employeeId) {
		Employee updatedEmployee = this.employeeRepository.findById(employeeId).get();

		List<String> notifications = updatedEmployee.getNotifications();

		if (adminId != employeeId)
			notifications.add(adminName + "(" + adminId + ") has updated your details.");
		else
			notifications.add("Details got updated.");

		this.employeeRepository.save(updatedEmployee);

		/* Send events to clients */
		sendEmitters();

		return "Added to Notification list to updated Employee";
	}

	/* Should return notifications based on id */
	public List<String> getNotifications(long id) {
		return this.employeeRepository.findById(id).get().getNotifications();
	}

	/* Should delete notifications based on id */
	public String deleteNotifications(long id) {
		Employee tempEmployee = this.employeeRepository.findById(id).get();

		tempEmployee.setNotifications(new ArrayList<String>());

		this.employeeRepository.save(tempEmployee);

		return "Deleted Notifications";
	}

	/* Should return all employees */
	public List<Employee> findAll() {
		return this.employeeRepository.findAll();
	}

	/* Should add an employee */
	public String addEmployee(Employee employee, String adminName, long adminId) throws ParseException {

		employee.setId(dbSequenceGenr.getSequenceNumber(Employee.SEQUENCE_NAME));
		if (employee.getRole() == null)
			employee.setRole("EMPLOYEE");
		employee.setPassword(this.bCryptPasswordEncoder.encode(employee.getPassword()));
		employee.setActive(false);
		employee.setLoginAttempts(0);
		List<String> notifications = new ArrayList<String>();
		notifications.add("Hi, " + employee.getFirstName() + "! Welcome to Employee Management System.");
		employee.setNotifications(notifications);
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		String date_string = "26-09-1989";
		Date date = formatter.parse(date_string);
		employee.setLockTime(date);
		if (adminId != 0)
			this.addToNotiListAdminAddNewEmployee(adminName, adminId, employee.getFirstName(), employee.getId());
		this.employeeRepository.save(employee);
		return "Added";
	}

	/* Should delete employee based on id */
	public void deleteEmployee(long id) {
		this.employeeRepository.deleteById(id);
	}

	/* Should set lock time based on mail */
	public String setLockTime(String email) {
		Employee employee = this.employeeRepository.findByEmail(email);

		employee.setLockTime(new Date());

		this.employeeRepository.save(employee);
		return "Updated";
	}

	/* Should return lock time left based on mail */
	public long getRestOfLockTime(String email) {
		Employee employee = this.employeeRepository.findByEmail(email);

		long lockTimeInMillis = employee.getLockTime().getTime();
		long currentTimeInMillis = System.currentTimeMillis();

		return currentTimeInMillis - lockTimeInMillis;
	}

	/* Should change login attempts */
	public String changeLoginAttempts(Employee employee) {

		Employee temp = this.employeeRepository.findByEmail(employee.getEmail());

		temp.setLoginAttempts(employee.getLoginAttempts());

		this.employeeRepository.save(temp);

		return "Loggin Attempts " + employee.getLoginAttempts();
	}

	/* Should return login attempts based on mail */
	public long getLoginAttempts(String mail) {
		return this.employeeRepository.findByEmail(mail).getLoginAttempts();
	}

	/* Should change password based on id */
	public String changePassword(long id, Employee employee) {
		Employee tempEmployee = this.employeeRepository.findById(id).get();

		if (employee.getPassword() != null)
			tempEmployee.setPassword(this.bCryptPasswordEncoder.encode(employee.getPassword()));

		tempEmployee.setActive(employee.isActive());
		List<String> notifications = tempEmployee.getNotifications();

		notifications.add("Password got changed succesfully!!");
		tempEmployee.setNotifications(notifications);

		this.employeeRepository.save(tempEmployee);

		return "Password Updated";
	}

	/* Should change active based on id */
	public String changeActive(long id, Employee employee) {
		Employee tempEmployee = this.employeeRepository.findById(id).get();

		tempEmployee.setActive(employee.isActive());

		this.employeeRepository.save(tempEmployee);

		return "Active" + employee.isActive();
	}

	/* Should change active based on email */
	public String changeActiveByMail(String mail, Employee employee) {
		Employee tempEmployee = this.employeeRepository.findByEmail(mail);

		tempEmployee.setActive(employee.isActive());

		this.employeeRepository.save(tempEmployee);

		return "Active" + employee.isActive();
	}

	/* Should update employee based on id */
	public String employeeUpdate(String adminName, long adminId, long id, Employee employee) {
		Employee tempEmployee = this.employeeRepository.findById(id).get();

		tempEmployee.setEmail(employee.getEmail());
		tempEmployee.setFirstName(employee.getFirstName());
		tempEmployee.setJob(employee.getJob());
		tempEmployee.setLastName(employee.getLastName());
		tempEmployee.setSalary(employee.getSalary());
		tempEmployee.setRole(employee.getRole());
		tempEmployee.setActive(employee.isActive());
		tempEmployee.setLoginAttempts(employee.getLoginAttempts());
		this.employeeRepository.save(tempEmployee);

		this.addToNotiListAdminUpdateEmployee(adminName, adminId, id);

		return "Updated";
	}

	/* Should return if the email id exists or not */
	public boolean findByEmail(String email) {
		return !(this.employeeRepository.findByEmail(email) == null);
	}

	/* Should get employee based on id */
	public Employee findById(long id) {
		return this.employeeRepository.findById(id).get();
	}

	/* Used for testing purpose */
	public EmployeeService(EmployeeRepository employeeRepository) {
		super();
		this.employeeRepository = employeeRepository;
	}

	/* Should download the employee list in pdf form */
	public void downloadPdf(HttpServletResponse response, String currentDateTime, String headerKey,
			List<Employee> listEmployee) throws DocumentException, IOException {
		response.setContentType("application/pdf");
		String headerValue = "attachment; filename=Employees_" + currentDateTime + ".pdf";
		response.setHeader(headerKey, headerValue);
		EmployeePdfExporter exporter = new EmployeePdfExporter(listEmployee);
		exporter.export(response);
	}

	/* Should download the employee list in Excel form */
	public void downloadExcel(HttpServletResponse response, String currentDateTime, String headerKey,
			List<Employee> listEmployee) throws IOException {
		String headerValue = "attachment; filename=Employees_" + currentDateTime + ".xlsx";
		response.setHeader(headerKey, headerValue);
		EmployeeExcelExporter employeeExcelExporter = new EmployeeExcelExporter(listEmployee);
		employeeExcelExporter.export(response);
	}

	/* Should download the employee list in Csv Form */
	public void downloadCsv(HttpServletResponse response, String currentDateTime, String headerKey,
			List<Employee> listEmployee) throws IOException {
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

}