package com.sonatrach.dz.utils;

import java.util.Date;



public class ProcResult {
	
	private Integer IDUSERIDMS;
	
	private Integer IDROLE;
	private Integer IDSTATUS;
	private String DESCROLE;
	private Date PRIVSTARTDATE;
	private Date PRIVENDDATE;
	private Integer IDUSER;
	private Integer IDAPPLICATION;
	private String APPLICATIONTITLE;
	private String APPLICATIONDESC;
	private String APPLICATIONDETAIL;
	private String ICONURL;
	private Integer APPLICATIONMODE;
    private String APPLICATIONURL;
    private Integer PUBLICFLAG;
    private Integer IEFLAG;
    
   public ProcResult() {
	   
   }
	public ProcResult(Integer iDUSERIDMS, Integer iDROLE, Integer iDSTATUS, String dESCROLE, Date pRIVSTARTDATE,
			Date pRIVENDDATE, Integer iDUSER, Integer iDAPPLICATION, String aPPLICATIONTITLE, String aPPLICATIONDESC,
			String aPPLICATIONDETAIL, String iCONURL, Integer aPPLICATIONMODE, String aPPLICATIONURL,
			Integer pUBLICFLAG) {
		
		IDUSERIDMS = iDUSERIDMS;
		IDROLE = iDROLE;
		IDSTATUS = iDSTATUS;
		DESCROLE = dESCROLE;
		PRIVSTARTDATE = pRIVSTARTDATE;
		PRIVENDDATE = pRIVENDDATE;
		IDUSER = iDUSER;
		IDAPPLICATION = iDAPPLICATION;
		APPLICATIONTITLE = aPPLICATIONTITLE;
		APPLICATIONDESC = aPPLICATIONDESC;
		APPLICATIONDETAIL = aPPLICATIONDETAIL;
		ICONURL = iCONURL;
		APPLICATIONMODE = aPPLICATIONMODE;
		APPLICATIONURL = aPPLICATIONURL;
		PUBLICFLAG = pUBLICFLAG;
	}

	public Integer getIDAPPLICATION() {
		return IDAPPLICATION;
	}

	public void setIDAPPLICATION(Integer iDAPPLICATION) {
		IDAPPLICATION = iDAPPLICATION;
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

	public Integer getIDUSERIDMS() {
		return IDUSERIDMS;
	}

	public void setIDUSERIDMS(Integer iDUSERIDMS) {
		IDUSERIDMS = iDUSERIDMS;
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

	public Integer getIDUSER() {
		return IDUSER;
	}

	public void setIDUSER(Integer iDUSER) {
		IDUSER = iDUSER;
	}

	public String getAPPLICATIONTITLE() {
		return APPLICATIONTITLE;
	}

	public void setAPPLICATIONTITLE(String aPPLICATIONTITLE) {
		APPLICATIONTITLE = aPPLICATIONTITLE;
	}

	public String getAPPLICATIONDESC() {
		return APPLICATIONDESC;
	}

	public void setAPPLICATIONDESC(String aPPLICATIONDESC) {
		APPLICATIONDESC = aPPLICATIONDESC;
	}

	public String getAPPLICATIONDETAIL() {
		return APPLICATIONDETAIL;
	}

	public void setAPPLICATIONDETAIL(String aPPLICATIONDETAIL) {
		APPLICATIONDETAIL = aPPLICATIONDETAIL;
	}

	public String getICONURL() {
		return ICONURL;
	}

	public void setICONURL(String iCONURL) {
		ICONURL = iCONURL;
	}

	public Integer getAPPLICATIONMODE() {
		return APPLICATIONMODE;
	}

	public void setAPPLICATIONMODE(Integer aPPLICATIONMODE) {
		APPLICATIONMODE = aPPLICATIONMODE;
	}

	public String getAPPLICATIONURL() {
		return APPLICATIONURL;
	}

	public void setAPPLICATIONURL(String pPLICATIONURL) {
		APPLICATIONURL = pPLICATIONURL;
	}

	public Integer getPUBLICFLAG() {
		return PUBLICFLAG;
	}

	public void setPUBLICFLAG(Integer pUBLICFLAG) {
		PUBLICFLAG = pUBLICFLAG;
	}
	public Integer getIEFLAG() {
		return IEFLAG;
	}
	public void setIEFLAG(Integer iEFLAG) {
		IEFLAG = iEFLAG;
	}
    
    
}
