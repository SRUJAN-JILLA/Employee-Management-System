package com.employee.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//marks a class for the domain object that we want to persist in the db
@Document(collection = "db_sequence")
public class DbSequence {
	@Id
	private String id;
	private long seq;

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

	public DbSequence(String id, long seq) {
		super();
		this.id = id;
		this.seq = seq;
	}

	@Override
	public String toString() {
		return "DbSequence [id=" + id + ", seq=" + seq + "]";
	}

	public DbSequence() {
		super();
	}

}