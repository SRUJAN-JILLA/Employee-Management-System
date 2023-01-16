package com.employee.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.employee.Model.Role;

public interface RoleRepository extends MongoRepository<Role,String>{

}
