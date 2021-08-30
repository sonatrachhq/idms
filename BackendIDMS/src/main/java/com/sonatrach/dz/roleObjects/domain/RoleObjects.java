package com.sonatrach.dz.roleObjects.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;


@Entity
@Table(name = "ROLEOBJECTS")
@IdClass(RoleObjectsId.class)
public class RoleObjects {
	@Id
private Integer idobject;
	@Id
private Integer idrole;
private Integer iduser;
private Date systemdate;
public RoleObjects() {
	super();
	// TODO Auto-generated constructor stub
}
public RoleObjects(Integer idobject, Integer idrole, Integer iduser, Date systemdate) {
	super();
	this.idobject = idobject;
	this.idrole = idrole;
	this.iduser = iduser;
	this.systemdate = systemdate;
}
public Integer getIdobject() {
	return idobject;
}
public void setIdobject(Integer idobject) {
	this.idobject = idobject;
}
public Integer getIdrole() {
	return idrole;
}
public void setIdrole(Integer idrole) {
	this.idrole = idrole;
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
