package com.sonatrach.dz.roleObjects.domain;

import java.io.Serializable;

public class RoleObjectsId implements Serializable {
	private Integer idobject;

	private Integer idrole;

	public Integer getIdobject() {
		return idobject;
	}

	public void setIdobject(Integer idobject) {
		this.idobject = idobject;
	}

	public Integer getIdrole() {
		return idrole;
	}

	public void setIdrole(Integer idrole) {
		this.idrole = idrole;
	}

}
