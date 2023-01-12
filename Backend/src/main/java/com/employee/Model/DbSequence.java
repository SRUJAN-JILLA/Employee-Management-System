package com.employee.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "db_sequence")
public class DbSequence {
	
	@Id
	private String id;
	private long seq = 100000;

	public DbSequence(String id, long seq) {
		super();
		this.id = id;
		this.seq = seq;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public long getSeq() {
		return seq;
	}

	public void setSeq(long seq) {
		this.seq = seq;
	}

	public DbSequence() {
		super();
	}

}
