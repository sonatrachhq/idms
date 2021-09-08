package com.sonatrach.dz.objectType.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "OBJECTTYPE")
public class ObjectTypeApp {
	@Id 
private Integer idobjecttype;
private String descobjecttype;
private Integer idstatus;
private String imgexample;
public ObjectTypeApp() {
	super();
	// TODO Auto-generated constructor stub
}
public ObjectTypeApp(Integer idobjecttype, String descobjecttype, Integer idstatus, String imgexample) {
	super();
	this.idobjecttype = idobjecttype;
	this.descobjecttype = descobjecttype;
	this.idstatus = idstatus;
	this.imgexample = imgexample;
}
public Integer getIdobjecttype() {
	return idobjecttype;
}
public void setIdobjecttype(Integer idobjecttype) {
	this.idobjecttype = idobjecttype;
}
public String getDescobjecttype() {
	return descobjecttype;
}
public void setDescobjecttype(String descobjecttype) {
	this.descobjecttype = descobjecttype;
}
public Integer getIdstatus() {
	return idstatus;
}
public void setIdstatus(Integer idstatus) {
	this.idstatus = idstatus;
}
public String getImgexample() {
	return imgexample;
}
public void setImgexample(String imgexample) {
	this.imgexample = imgexample;
}



}
