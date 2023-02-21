package com.employee.Service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

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

	public List<SseEmitter> emitters = new CopyOnWriteArrayList<>();
//	private final List<SseEmitter> emitters = Collections.synchronizedList(new ArrayList<>());

	public SseEmitter subscribe() {

		SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
		try {
			sseEmitter.send(SseEmitter.event().name("INIT"));
		} catch (IOException e) {
			e.printStackTrace();
			emitters.remove(sseEmitter);
		}
		sseEmitter.onCompletion(() ->{
			emitters.remove(sseEmitter);
		});
		
		emitters.add(sseEmitter);
		return sseEmitter; 
	}


	// adding into admin role notification list when a new user gets added
	public String addToNotiListAdminAddNewEmployee(String adminName, long adminId, String employeeName,
			long employeeId) {
		List<Employee> employees = this.employeeRepository.findAll();

		for (int i = 0; i < employees.size(); i++) {
			Employee temp = employees.get(i);

			if (temp.getRole().equals("ADMIN")) {

				List<String> notifications = temp.getNotifications();
				notifications.add(adminName + "(" + adminId + ") has added a new Employee "
				+ employeeName + "("+ employeeId + ").");
				
				temp.setNotifications(notifications);

				this.employeeRepository.save(temp);
			}
		}
		
		synchronized (this.emitters) {
			for (int i=0;i<emitters.size();i++) {
				SseEmitter emitter = emitters.get(i);
				try {
					emitter.send(SseEmitter.event().name("notifications").data("fired"));
				} catch (IOException e) {
					emitters.remove(emitter);
				}
			}
		}
		return "Added to Notification list(Added) to all admins";
	}

	// adding into admin role notification list when a new user gets deleted
	public String addToNotiListAdminDeleteEmployee(String adminName, long adminId, List<Long> employeeIds) {
		System.out.println("You r here");
		List<Employee> employees = this.employeeRepository.findAll();

		for (int i = 0; i < employees.size(); i++) {
			Employee temp = employees.get(i);
			if (temp.getRole().equals("ADMIN")) {
				List<String> notifications = temp.getNotifications();
				for(int j=0;j<employeeIds.size();j++) {
				notifications.add(adminName + "(" + adminId + ") has deleted an Employee " + "(" + employeeIds.get(j) + ").");
				}
				temp.setNotifications(notifications);

				this.employeeRepository.save(temp);
			}
		}
		
		synchronized (this.emitters) {
			for (int i=0;i<emitters.size();i++) {
				SseEmitter emitter = emitters.get(i);
				try {
					emitter.send(SseEmitter.event().name("notifications").data("fired"));
				} catch (IOException e) {
					emitters.remove(emitter);
				}
			}
		}
		
		return "Added to Notification list(deleted) to all admins";
	}

	// adding into updated employee notification list when an admin updated his/her
	// details
	public String addToNotiListAdminUpdateEmployee(String adminName, long adminId, long employeeId) {
		Employee updatedEmployee = this.employeeRepository.findById(employeeId).get();

		synchronized (this.emitters) {
			for (int i=0;i<emitters.size();i++) {
				SseEmitter emitter = emitters.get(i);
				try {
					emitter.send(SseEmitter.event().name("notifications").data("fired"));
				} catch (IOException e) {
					emitters.remove(emitter);
				}
			}
		}
		List<String> notifications = updatedEmployee.getNotifications();
		notifications.add(adminName + "(" + adminId + ") has updated your details.");

		this.employeeRepository.save(updatedEmployee);

		return "Added to Notification list to updated Employee";
	}

	// get notifications based on id
	public List<String> getNotifications(long id) {
		return this.employeeRepository.findById(id).get().getNotifications();
	}

	// delete Notification based on id
	public String deleteNotifications(long id) {
		Employee tempEmployee = this.employeeRepository.findById(id).get();

		tempEmployee.setNotifications(new ArrayList<String>());

		this.employeeRepository.save(tempEmployee);

		return "Deleted Notifications";
	}

	// Getting Employee details
	public List<Employee> findAll() {
		return this.employeeRepository.findAll();
	}

	// Adding Employee
	public String addEmployee(Employee employee, String adminName, long adminId) throws ParseException {
		System.out.println(employee);

		// generate sequence and save employee data
		employee.setId(dbSequenceGenr.getSequenceNumber(Employee.SEQUENCE_NAME));

		if (employee.getRole() == null)
			employee.setRole("EMPLOYEE");

		employee.setPassword(this.bCryptPasswordEncoder.encode(employee.getPassword()));

		employee.setActive(false);

		employee.setLoginAttempts(0);

		employee.setNotifications(new ArrayList<String>());

		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		String date_string = "26-09-1989";
		Date date = formatter.parse(date_string);
		employee.setLockTime(date);

		System.out.println(employee);

		if (adminId != 0)
			this.addToNotiListAdminAddNewEmployee(adminName, adminId, employee.getFirstName(), employee.getId());

		this.employeeRepository.save(employee);

		return "Added";

	}

	// Delete Employee
	public void deleteEmployee(long id) {

		this.employeeRepository.deleteById(id);
	}

	// set failed login attempt
	public void setLockTime(String email) {
		Employee employee = this.employeeRepository.findByEmail(email);

		employee.setLockTime(new Date());

		this.employeeRepository.save(employee);
	}

	// get how much time left to remove lock in time
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

		return "Loggin Attempts " + employee.getLoginAttempts();
	}

	// get login attempts
	public long getLoginAttempts(String mail) {
		return this.employeeRepository.findByEmail(mail).getLoginAttempts();

	}

	public String changePassword(long id, Employee employee) {
		Employee tempEmployee = this.employeeRepository.findById(id).get();

		if (employee.getPassword() != null)
			tempEmployee.setPassword(this.bCryptPasswordEncoder.encode(employee.getPassword()));

		tempEmployee.setActive(employee.isActive());
		this.employeeRepository.save(tempEmployee);

		return "Password Updated";
	}

	public String changeActive(long id, Employee employee) {
		Employee tempEmployee = this.employeeRepository.findById(id).get();

		tempEmployee.setActive(employee.isActive());

		this.employeeRepository.save(tempEmployee);

		return "Active" + employee.isActive();
	}

	public String changeActiveByMail(String mail, Employee employee) {
		Employee tempEmployee = this.employeeRepository.findByEmail(mail);

		tempEmployee.setActive(employee.isActive());

		this.employeeRepository.save(tempEmployee);

		return "Active" + employee.isActive();
	}

	public String employeeUpdate(String adminName, long adminId, long id, Employee employee) {
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

		this.addToNotiListAdminUpdateEmployee(adminName, adminId, id);

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

//public void deleteAll() {
//	this.employeeRepository.deleteAll();
//	List<Role> roles = this.roleRepository.findAll();
//
//	for (int i = 0; i < roles.size(); i++) {
//		Role role = roles.get(i);
//		role.setUserIdSet(new HashSet<>());
//		this.roleRepository.save(role);
//	}
//}

//// Getting Roles
//public List<Role> getRoles() {
//	return this.roleRepository.findAll();
//}
//
//// Adding Role
//public String addRole(Role role) {
//	role.setUserIdSet(new HashSet<>());
//	this.roleRepository.save(role);
//	return "Added";
//}

//to update the rolerepository
//this.employeeRepository.save(tempEmployee);

// update in Role repository
// need to work on this ->
//if(!role.equals(employee.getRole())) {
////delete it in existing Role object
//Role roleObject = this.roleRepository.findById(role).get();
//Set<Long> useridSet = roleObject.getUserIdSet();
//useridSet.remove(id);
//roleObject.setUserIdSet(useridSet);
//System.out.println(roleObject);
//
//this.roleRepository.save(roleObject);
//
////adding it in new Role object
//Role newRoleObject = this.roleRepository.findById(employee.getRole()).get();
//Set<Long> newUseridSet = roleObject.getUserIdSet();
//System.out.println(newUseridSet + "before adding the new role");
//
//newUseridSet.add(employee.getId());
//
//newRoleObject.setUserIdSet(newUseridSet);
//System.out.println(newRoleObject);
//
//this.roleRepository.save(newRoleObject);
//}

//to delete the role
//String role = this.employeeRepository.findById(id).get().getRole();
//Role roleObject = this.roleRepository.findById(role).get();
//Set<Long> useridSet = roleObject.getUserIdSet();
//useridSet.remove(id);
//roleObject.setUserIdSet(useridSet);
//this.roleRepository.save(roleObject);

//adding role
// updating role table about user id
//Role role = this.roleRepository.findById("EMPLOYEE").get();
//role.getUserIdSet().add(employee.getId());
//roleRepository.save(role);

//delete multiple employees
//public void deleteMultiple(long[] ids) {
//	for(int i=0;i<ids.length;i++) {
//		this.employeeRepository.deleteById(ids[i]);
//	}
//	System.out.println(ids);
//}