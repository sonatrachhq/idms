package com.sonatrach.dz.utils;

public class Ntlm {
	private String username;
	private String domain;
	private String workstation;
	
	
	
	
	public Ntlm() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Ntlm(String username, String domain, String workstation) {
		super();
		this.username = username;
		this.domain = domain;
		this.workstation = workstation;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public String getWorkstation() {
		return workstation;
	}

	public void setWorkstation(String workstation) {
		this.workstation = workstation;
	}

	public String toString() {
		return domain.toString()+"  "+username.toString()+"  "+workstation.toString();
	}
	
	
}
