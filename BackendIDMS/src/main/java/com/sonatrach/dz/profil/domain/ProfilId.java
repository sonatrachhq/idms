package com.sonatrach.dz.profil.domain;

import java.io.Serializable;

import javax.persistence.Id;

public class ProfilId implements Serializable{
	private Integer iduseridms;
	private Integer idapplication;

	
	public ProfilId() {
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

	
}
