package com.sonatrach.dz.message.request;


public class LoginForm {

    private String sonuser;

    private String password;


    public String getSonuser() {
		return sonuser;
	}

	public void setSonuser(String sonuser) {
		this.sonuser = sonuser;
	}

	public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}