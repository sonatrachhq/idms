package com.sonatrach.dz.interim.domain;

import java.io.Serializable;

public class InterimId implements Serializable{
private Integer iduseridms;
private Integer idapplication;
private Integer idinterim;
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


}
