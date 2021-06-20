package com.sonatrach.dz.userIDMS.domain;

import java.sql.Date;
import java.util.HashSet;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;


import org.hibernate.annotations.NaturalId;

@Entity
@Table(name = "USERIDMS")
@SequenceGenerator(name="USERIDMS_ID_SEQ",initialValue=2, allocationSize=1)
public class UserIDMS{
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="USERIDMS_ID_SEQ")
	@Column(name="IDUSERIDMS")
    private Integer iduseridms;
	@Column(name="IDLANGUAGE")
    private Integer idlang;
	@Column(name="SONUSER", unique = true)
    private String sonuser;
	@Column(name="PSWUSER")
    private String pswuser;
	@Column(name="USERSTATUS")
    private int userstatus;
	@Column(name="IDUSER")
	private Integer iduser;
	@Column(name="SYSTEMDATE")
	private Date sysdate;
  
    public UserIDMS() {}


 

    public UserIDMS( Integer idlang, String sonuser, String pswuser, int userstatus, Integer iduser,
			Date sysdate) {
		super();
		this.idlang = idlang;
		this.sonuser = sonuser;
		this.pswuser = pswuser;
		this.userstatus = userstatus;
		this.iduser = iduser;
		this.sysdate = sysdate;
	}




	public Integer getIduseridms() {
		return iduseridms;
	}




	public void setIduseridms(Integer iduseridms) {
		this.iduseridms = iduseridms;
	}




	public Integer getIdlang() {
		return idlang;
	}




	public void setIdlang(Integer idlang) {
		this.idlang = idlang;
	}




	public String getSonuser() {
		return sonuser;
	}




	public void setSonuser(String sonuser) {
		this.sonuser = sonuser;
	}




	public String getPswuser() {
		return pswuser;
	}




	public void setPswuser(String pswuser) {
		this.pswuser = pswuser;
	}




	public int getUserstatus() {
		return userstatus;
	}




	public void setUserstatus(int userstatus) {
		this.userstatus = userstatus;
	}




	public Integer getIduser() {
		return iduser;
	}




	public void setIduser(Integer iduser) {
		this.iduser = iduser;
	}




	public Date getSysdate() {
		return sysdate;
	}




	public void setSysdate(Date sysdate) {
		this.sysdate = sysdate;
	}






 
}