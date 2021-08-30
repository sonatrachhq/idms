package com.sonatrach.dz.interim.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.sonatrach.dz.profil.domain.ProfilId;

@Entity
@Table(name ="INTERIM")
@IdClass(InterimId.class)
@SequenceGenerator(name="INTERIM_ID_SEQ", allocationSize=1)
@NamedQuery(name = "Interim.findIdmsRoles", query = "SELECT p FROM Interim  p WHERE idinterim=?1 and idapplication=?2 ")
public class Interim {
	@Id
	private Integer iduseridms;
	@Id
	private Integer idapplication;
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="INTERIM_ID_SEQ")
	private Integer idinterim;
	private Integer idstatus;
	private String descinterim;
	private Date interimstartdate;
	private Date interimenddate;
	private Integer iduser;
	private Date systemdate;
	public Interim(Integer iduseridms, Integer idapplication, Integer idinterim, Integer idstatus, String descinterim,
			Date interimstartdate, Date interimenddate, Integer iduser, Date systemdate) {
		super();
		this.iduseridms = iduseridms;
		this.idapplication = idapplication;
		this.idinterim = idinterim;
		this.idstatus = idstatus;
		this.descinterim = descinterim;
		this.interimstartdate = interimstartdate;
		this.interimenddate = interimenddate;
		this.iduser = iduser;
		this.systemdate = systemdate;
	}
	public Interim() {
		super();
		// TODO Auto-generated constructor stub
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
	public Integer getIdinterim() {
		return idinterim;
	}
	public void setIdinterim(Integer idinterim) {
		this.idinterim = idinterim;
	}
	public Integer getIdstatus() {
		return idstatus;
	}
	public void setIdstatus(Integer idstatus) {
		this.idstatus = idstatus;
	}
	public String getDescinterim() {
		return descinterim;
	}
	public void setDescinterim(String descinterim) {
		this.descinterim = descinterim;
	}
	public Date getInterimstartdate() {
		return interimstartdate;
	}
	public void setInterimstartdate(Date interimstartdate) {
		this.interimstartdate = interimstartdate;
	}
	public Date getInterimenddate() {
		return interimenddate;
	}
	public void setInterimenddate(Date interimenddate) {
		this.interimenddate = interimenddate;
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
