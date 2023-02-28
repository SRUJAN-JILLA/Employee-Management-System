package com.employee.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.employee.Model.Employee;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, Long> {
	public Employee findByEmail(String email);
}
