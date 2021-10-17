package com.sonatrach.dz.storedProcResponse;

import java.util.List;

public class UsersObject {
	private Integer IDAPPLICATION;
	private List<ObjectType> objects;
	
	
	public UsersObject() {
	
	}


	public UsersObject(Integer iDAPPLICATION, List<ObjectType> objects) {
		super();
		IDAPPLICATION = iDAPPLICATION;
		this.objects = objects;
	}


	public Integer getIDAPPLICATION() {
		return IDAPPLICATION;
	}


	public void setIDAPPLICATION(Integer iDAPPLICATION) {
		IDAPPLICATION = iDAPPLICATION;
	}


	public List<ObjectType> getObjects() {
		return objects;
	}


	public void setObjects(List<ObjectType> objects) {
		this.objects = objects;
	}
	
	
}
