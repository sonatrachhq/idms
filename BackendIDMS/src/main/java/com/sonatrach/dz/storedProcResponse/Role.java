package com.sonatrach.dz.storedProcResponse;

import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

public class Role {
	private Integer IDROLE;
	private Integer IDSTATUS;
	private String DESCROLE;
	 @Temporal(TemporalType.DATE)
	private Date PRIVSTARTDATE;
	 @Temporal(TemporalType.DATE)
	private Date PRIVENDDATE;
	public Role() {
		
	}
	
	public Role(Integer iDROLE, Integer iDSTATUS, String dESCROLE, Date pRIVSTARTDATE, Date pRIVENDDATE) {
		super();
		IDROLE = iDROLE;
		IDSTATUS = iDSTATUS;
		DESCROLE = dESCROLE;
		PRIVSTARTDATE = pRIVSTARTDATE;
		PRIVENDDATE = pRIVENDDATE;
	}
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
