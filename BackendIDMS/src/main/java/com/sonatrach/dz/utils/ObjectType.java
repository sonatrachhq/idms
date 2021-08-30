package com.sonatrach.dz.utils;

import java.util.Date;

public class ObjectType {
	private Integer IDOBJECT;
	private Integer IDOBJECTTYPE;
	private Integer IDPARENTOBJECT;
	private Integer IDSTATUS;
	private String DESCOBJECT;
	private Date PRIVSTARTDATE;
	private Date PRIVENDDATE;
	private Integer IDROLE;
	 private Date INTERIMSTARTDATE;
	    private Date INTERIMENDDATE;

	    
	    
	public ObjectType(Integer iDOBJECT, Integer iDOBJECTTYPE, Integer iDPARENTOBJECT, Integer iDSTATUS,
				String dESCOBJECT, Date pRIVSTARTDATE, Date pRIVENDDATE, Integer iDROLE, Date iNTERIMSTARTDATE,
				Date iNTERIMENDDATE) {
			super();
			IDOBJECT = iDOBJECT;
			IDOBJECTTYPE = iDOBJECTTYPE;
			IDPARENTOBJECT = iDPARENTOBJECT;
			IDSTATUS = iDSTATUS;
			DESCOBJECT = dESCOBJECT;
			PRIVSTARTDATE = pRIVSTARTDATE;
			PRIVENDDATE = pRIVENDDATE;
			IDROLE = iDROLE;
			INTERIMSTARTDATE = iNTERIMSTARTDATE;
			INTERIMENDDATE = iNTERIMENDDATE;
		}
	public ObjectType() {
		
	}
	
	public Date getINTERIMSTARTDATE() {
		return INTERIMSTARTDATE;
	}
	public void setINTERIMSTARTDATE(Date iNTERIMSTARTDATE) {
		INTERIMSTARTDATE = iNTERIMSTARTDATE;
	}
	public Date getINTERIMENDDATE() {
		return INTERIMENDDATE;
	}
	public void setINTERIMENDDATE(Date iNTERIMENDDATE) {
		INTERIMENDDATE = iNTERIMENDDATE;
	}
	public Integer getIDOBJECT() {
		return IDOBJECT;
	}
	public void setIDOBJECT(Integer iDOBJECT) {
		IDOBJECT = iDOBJECT;
	}
	public Integer getIDOBJECTTYPE() {
		return IDOBJECTTYPE;
	}
	public void setIDOBJECTTYPE(Integer iDOBJECTTYPE) {
		IDOBJECTTYPE = iDOBJECTTYPE;
	}
	public Integer getIDPARENTOBJECT() {
		return IDPARENTOBJECT;
	}
	public void setIDPARENTOBJECT(Integer iDPARENTOBJECT) {
		IDPARENTOBJECT = iDPARENTOBJECT;
	}
	public Integer getIDSTATUS() {
		return IDSTATUS;
	}
	public void setIDSTATUS(Integer iDSTATUS) {
		IDSTATUS = iDSTATUS;
	}
	public String getDESCOBJECT() {
		return DESCOBJECT;
	}
	public void setDESCOBJECT(String dESCOBJECT) {
		DESCOBJECT = dESCOBJECT;
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
	public Integer getIDROLE() {
		return IDROLE;
	}
	public void setIDROLE(Integer iDROLE) {
		IDROLE = iDROLE;
	}
	
	
}
