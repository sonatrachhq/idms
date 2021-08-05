package com.sonatrach.dz.utils;
import java.util.List;
public class UserAppPrivs {
	private Integer IDUSERIDMS;
	private Integer IDAPPLICATION;
	private String APPLICATIONTITLE;
	private String APPLICATIONDESC;
	private String APPLICATIONDETAIL;
	private String ICONURL;
	private Integer APPLICATIONMODE;
    private String APPLICATIONURL;
    private Integer PUBLICFLAG;
    private Integer IEFLAG;
	private List<Role> ROLES;
	
	
	
	public UserAppPrivs() {
		
	}
	
	public UserAppPrivs(Integer iDUSERIDMS, Integer iDAPPLICATION, String aPPLICATIONTITLE, String aPPLICATIONDESC,
			String aPPLICATIONDETAIL, String iCONURL, Integer aPPLICATIONMODE, String aPPLICATIONURL,
			Integer pUBLICFLAG, List<Role> rOLES) {
		super();
		IDUSERIDMS = iDUSERIDMS;
		IDAPPLICATION = iDAPPLICATION;
		APPLICATIONTITLE = aPPLICATIONTITLE;
		APPLICATIONDESC = aPPLICATIONDESC;
		APPLICATIONDETAIL = aPPLICATIONDETAIL;
		ICONURL = iCONURL;
		APPLICATIONMODE = aPPLICATIONMODE;
		APPLICATIONURL = aPPLICATIONURL;
		PUBLICFLAG = pUBLICFLAG;
		ROLES = rOLES;
	}
	public Integer getIDUSERIDMS() {
		return IDUSERIDMS;
	}
	public void setIDUSERIDMS(Integer iDUSERIDMS) {
		IDUSERIDMS = iDUSERIDMS;
	}
	public Integer getIDAPPLICATION() {
		return IDAPPLICATION;
	}
	public void setIDAPPLICATION(Integer iDAPPLICATION) {
		IDAPPLICATION = iDAPPLICATION;
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
	public void setAPPLICATIONURL(String aPPLICATIONURL) {
		APPLICATIONURL = aPPLICATIONURL;
	}
	public Integer getPUBLICFLAG() {
		return PUBLICFLAG;
	}
	public void setPUBLICFLAG(Integer pUBLICFLAG) {
		PUBLICFLAG = pUBLICFLAG;
	}
	public List<Role> getROLES() {
		return ROLES;
	}
	public void setROLES(List<Role> rOLES) {
		ROLES = rOLES;
	}

	public Integer getIEFLAG() {
		return IEFLAG;
	}

	public void setIEFLAG(Integer iEFLAG) {
		IEFLAG = iEFLAG;
	}
	
	
}
