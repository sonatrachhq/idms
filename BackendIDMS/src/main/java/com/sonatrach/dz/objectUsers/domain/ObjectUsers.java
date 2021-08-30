package com.sonatrach.dz.objectUsers.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;


@Entity
@Table(name = "OBJECTUSERS")
@IdClass(ObjectUsersId.class)
public class ObjectUsers {
	@Id
private Integer idobject;
	@Id
private Integer iduseridms;
private Integer iduser;
private Date systemdate;
public ObjectUsers(Integer idobject, Integer iduseridms, Integer iduser, Date systemdate) {
	super();
	this.idobject = idobject;
	this.iduseridms = iduseridms;
	this.iduser = iduser;
	this.systemdate = systemdate;
}
public ObjectUsers() {
	super();
	// TODO Auto-generated constructor stub
}
public Integer getIdobject() {
	return idobject;
}
public void setIdobject(Integer idobject) {
	this.idobject = idobject;
}
public Integer getIduseridms() {
	return iduseridms;
}
public void setIduseridms(Integer iduseridms) {
	this.iduseridms = iduseridms;
}
public Integer getIduser() {
	return iduser;
}
public void setIduser(Integer iduser) {
	this.iduser = iduser;
}
public Date getSystemdate() {
	return systemdate;
}
public void setSystemdate(Date systemdate) {
	this.systemdate = systemdate;
}



}
