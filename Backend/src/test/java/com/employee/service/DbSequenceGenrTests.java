package com.employee.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.employee.Model.DbSequence;
import com.employee.Service.DbSequenceGenr;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class DbSequenceGenrTests {
	
	@InjectMocks
	private DbSequenceGenr dbSequenceGenr;
	
	@Mock
	private MongoOperations mongoOperations;

	@Mock
	private Query query;
	
	@Mock 
	private Update update;
	
	@Mock
	private DbSequence dbSequence;
	
	/* Should generate next id */
	@Test
	void getSequenceNumber() {
		
		long ans = this.dbSequenceGenr.getSequenceNumber("user_sequence");
		
		assertThat(ans).isNotNull();
	}

}
