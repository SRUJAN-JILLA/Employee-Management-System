package com.employee.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.employee.Model.DbSequence;

@Repository
public interface DbRepository extends MongoRepository<DbSequence,String>{

}
