package com.sonatrach.dz.approles.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "APPROLES")
@SequenceGenerator(name="APPROLES_ID_SEQ", allocationSize=1)
public class AppRoles {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="APPROLES_ID_SEQ")
	private Integer idrole;
	private Integer idapplication;
	private Integer idstatus;
	private String descrole;

public AppRoles() {
	
}



public AppRoles(Integer idapplication, Integer idstatus, String descrole) {

	this.idapplication = idapplication;
	this.idstatus = idstatus;
	this.descrole = descrole;
}



public Integer getIdrole() {
	return idrole;
}

public void setIdrole(Integer idrole) {
	this.idrole = idrole;
}

public Integer getIdapplication() {
	return idapplication;
}

public void setIdapplication(Integer idapplication) {
	this.idapplication = idapplication;
}

public Integer getIdstatus() {
	return idstatus;
}

public void setIdstatus(Integer idstatus) {
	this.idstatus = idstatus;
}

public String getDescrole() {
	return descrole;
}

public void setDescrole(String descrole) {
	this.descrole = descrole;
}

}
