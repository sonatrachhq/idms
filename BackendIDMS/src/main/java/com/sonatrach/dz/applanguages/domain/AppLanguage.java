package com.sonatrach.dz.applanguages.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "APPLANGUAGES")
public class AppLanguage {
	@Id
	private Integer idapplication;
	private Integer idlanguage;
	
	public AppLanguage() {
		
	}

	public Integer getIdapplication() {
		return idapplication;
	}

	public void setIdapplication(Integer idapplication) {
		this.idapplication = idapplication;
	}

	public Integer getIdlanguage() {
		return idlanguage;
	}

	public void setIdlanguage(Integer idlanguage) {
		this.idlanguage = idlanguage;
	}
	
}
