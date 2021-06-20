package com.sonatrach.dz.message.request;

import java.sql.Date;
import java.util.Set;

import javax.persistence.Column;





public class SignUpForm {

   

    private Integer idlang;
	
    private String sonuser;

    private String pswuser;

    private int userstatus;

	private Integer iduser;
	
	private Date sysdate;



	public Integer getIdlang() {
		return idlang;
	}

	public void setIdlang(Integer idlang) {
		this.idlang = idlang;
	}

	public String getSonuser() {
		return sonuser;
	}

	public void setSonuser(String sonuser) {
		this.sonuser = sonuser;
	}

	public String getPswuser() {
		return pswuser;
	}

	public void setPswuser(String pswuser) {
		this.pswuser = pswuser;
	}

	public int getUserstatus() {
		return userstatus;
	}

	public void setUserstatus(int userstatus) {
		this.userstatus = userstatus;
	}

	public Integer getIduser() {
		return iduser;
	}

	public void setIduser(Integer iduser) {
		this.iduser = iduser;
	}

	public Date getSysdate() {
		return sysdate;
	}

	public void setSysdate(Date sysdate) {
		this.sysdate = sysdate;
	}
	
	


  
}