package com.sonatrach.dz.appObject.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "APPOBJECTS")
@NamedQueries({@NamedQuery(name = "AppObject.findObjectsByApp", query = "SELECT p FROM AppObject p WHERE IDAPPLICATION=?1 "),

})
public class AppObject {
	@Id
	private Integer IDOBJECT;
	private Integer IDOBJECTTYPE;
	private Integer IDPARENTOBJECT;
	private Integer IDAPPLICATION;
	private Integer IDSTATUS;
	private String DESCOBJECT;
	public AppObject(Integer iDOBJECT, Integer iDOBJECTTYPE, Integer iDPARENTOBJECT, Integer iDAPPLICATION,
			Integer iDSTATUS, String dESCOBJECT) {
		super();
		IDOBJECT = iDOBJECT;
		IDOBJECTTYPE = iDOBJECTTYPE;
		IDPARENTOBJECT = iDPARENTOBJECT;
		IDAPPLICATION = iDAPPLICATION;
		IDSTATUS = iDSTATUS;
		DESCOBJECT = dESCOBJECT;
	}
	public AppObject() {
		super();
		// TODO Auto-generated constructor stub
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
	public Integer getIDAPPLICATION() {
		return IDAPPLICATION;
	}
	public void setIDAPPLICATION(Integer iDAPPLICATION) {
		IDAPPLICATION = iDAPPLICATION;
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
	
	
}
