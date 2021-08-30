package com.sonatrach.dz.appprivs.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQuery;
import javax.persistence.Table;


@Entity
@Table(name = "PRIVS")
@IdClass(AppPrivsId.class)
@NamedQuery(name = "AppPrivs.findByUser", query = "SELECT p FROM AppPrivs  p WHERE iduseridms=?1 ")
public class AppPrivs {
@Id
private Integer iduseridms;
@Id
private Integer idrole;
private Integer idstatus;
private Date privstartdate;
private Date privenddate;
private Integer iduser;
private Date systemdate;

public AppPrivs() {
	
}

public Integer getIduseridms() {
	return iduseridms;
}

public void setIduseridms(Integer iduseridms) {
	this.iduseridms = iduseridms;
}

public Integer getIdrole() {
	return idrole;
}

public void setIdrole(Integer idrole) {
	this.idrole = idrole;
}

public Integer getIdstatus() {
	return idstatus;
}

public void setIdstatus(Integer idstatus) {
	this.idstatus = idstatus;
}

public Date getPrivstartdate() {
	return privstartdate;
}

public void setPrivstartdate(Date privstartdate) {
	this.privstartdate = privstartdate;
}

public Date getPrivenddate() {
	return privenddate;
}

public void setPrivenddate(Date privenddate) {
	this.privenddate = privenddate;
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
