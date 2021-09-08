package com.sonatrach.dz.applications.domain;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "APPLICATIONS")
@NamedQueries({@NamedQuery(name = "Applications.findVisible", query = "SELECT p FROM Applications p WHERE dashbvisibility=1 and publicflag=0"),
	
	})
@SequenceGenerator(name="APPLICATIONS_ID_SEQ", allocationSize=1)
public class Applications {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="APPLICATIONS_ID_SEQ")
	private Integer idapplication;
	private String applicationtitle;
	private String applicationdesc;
	private String applicationdetail;
	private Integer applicationstatus;
	private Integer applicationmode;
	private Integer dashbvisibility;
	private String iconurl;
	private String applicationurl;
	private Integer iduser;
	private Date systemdate;
	private Integer publicflag;
	private Integer ieflag;

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

	public Integer getPublicflag() {
		return publicflag;
	}

	public void setPublicflag(Integer publicflag) {
		this.publicflag = publicflag;
	}

	public Integer getIeflag() {
		return ieflag;
	}

	public void setIeflag(Integer ieflag) {
		this.ieflag = ieflag;
	}

	public String getApplicationurl() {
		return applicationurl;
	}

	public void setApplicationurl(String applicationurl) {
		this.applicationurl = applicationurl;
	}

	public Integer getApplicationmode() {
		return applicationmode;
	}

	public void setApplicationmode(Integer applicationmode) {
		this.applicationmode = applicationmode;
	}

	
}
