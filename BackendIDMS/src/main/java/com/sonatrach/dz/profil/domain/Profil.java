package com.sonatrach.dz.profil.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;



@Entity
@Table(name ="PROFILES")
@IdClass(ProfilId.class)
@NamedQuery(name = "Profil.findByIdPrf", query = "SELECT p FROM Profil  p WHERE iduseridms=?1 and idapplication=?2 and idtheme=?3 and idlanguage=?4")
public class Profil {
	@Id
	Integer iduseridms;
	@Id
	Integer idapplication;
	Integer idtheme;
	Integer idlanguage;
	Integer iduser;
	Date systemdate;
	
	public Profil() {
		
	}

	public Integer getIduseridms() {
		return iduseridms;
	}

	public void setIduseridms(Integer iduseridms) {
		this.iduseridms = iduseridms;
	}

	public Integer getIdapplication() {
		return idapplication;
	}

	public void setIdapplication(Integer idapplication) {
		this.idapplication = idapplication;
	}

	public Integer getIdtheme() {
		return idtheme;
	}

	public void setIdtheme(Integer idtheme) {
		this.idtheme = idtheme;
	}

	public Integer getIdlanguage() {
		return idlanguage;
	}

	public void setIdlanguage(Integer idlanguage) {
		this.idlanguage = idlanguage;
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
