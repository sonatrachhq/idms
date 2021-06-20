package com.sonatrach.dz.applications.domain;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "APPLICATIONS")
@NamedQueries({@NamedQuery(name = "Applications.findVisible", query = "SELECT p FROM Applications p WHERE dashbvisibility=1"),

	})
public class Applications {
	@Id
	Integer idapplication;
	String applicationtitle;
	String applicationdesc;
	String applicationdetail;
	Integer applicationstatus;
	Integer dashbvisibility;
	String iconurl;
	Integer iduser;
	Date systemdate;

	public Applications() {

	}

	public Integer getIdapplication() {
		return idapplication;
	}

	public void setIdapplication(Integer idapplication) {
		this.idapplication = idapplication;
	}

	public String getApplicationtitle() {
		return applicationtitle;
	}

	public void setApplicationtitle(String applicationtitle) {
		this.applicationtitle = applicationtitle;
	}

	public String getApplicationdesc() {
		return applicationdesc;
	}

	public void setApplicationdesc(String applicationdesc) {
		this.applicationdesc = applicationdesc;
	}

	public String getApplicationdetail() {
		return applicationdetail;
	}

	public void setApplicationdetail(String applicationdetail) {
		this.applicationdetail = applicationdetail;
	}

	public Integer getApplicationstatus() {
		return applicationstatus;
	}

	public void setApplicationstatus(Integer applicationstatus) {
		this.applicationstatus = applicationstatus;
	}

	public Integer getDashbvisibility() {
		return dashbvisibility;
	}

	public void setDashbvisibility(Integer dashbvisibility) {
		this.dashbvisibility = dashbvisibility;
	}

	public String getIconurl() {
		return iconurl;
	}

	public void setIconurl(String iconurl) {
		this.iconurl = iconurl;
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
