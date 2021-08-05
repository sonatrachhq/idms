package com.sonatrach.dz.utils;

import java.util.Date;

public class Role {
	private Integer IDROLE;
	private Integer IDSTATUS;
	private String DESCROLE;
	private Date PRIVSTARTDATE;
	private Date PRIVENDDATE;
	public Integer getIDROLE() {
		return IDROLE;
	}
	public void setIDROLE(Integer iDROLE) {
		IDROLE = iDROLE;
	}
	public Integer getIDSTATUS() {
		return IDSTATUS;
	}
	public void setIDSTATUS(Integer iDSTATUS) {
		IDSTATUS = iDSTATUS;
	}
	public String getDESCROLE() {
		return DESCROLE;
	}
	public void setDESCROLE(String dESCROLE) {
		DESCROLE = dESCROLE;
	}
	public Date getPRIVSTARTDATE() {
		return PRIVSTARTDATE;
	}
	public void setPRIVSTARTDATE(Date pRIVSTARTDATE) {
		PRIVSTARTDATE = pRIVSTARTDATE;
	}
	public Date getPRIVENDDATE() {
		return PRIVENDDATE;
	}
	public void setPRIVENDDATE(Date pRIVENDDATE) {
		PRIVENDDATE = pRIVENDDATE;
	}
	
	
}
