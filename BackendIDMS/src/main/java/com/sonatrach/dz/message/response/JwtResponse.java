package com.sonatrach.dz.message.response;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private String sonuser;


	public JwtResponse(String accessToken, String sonuser) {
		this.token = accessToken;
		this.sonuser = sonuser;

	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public String getSonuser() {
		return sonuser;
	}

	public void setSonuser(String sonuser) {
		this.sonuser = sonuser;
	}


	
 
}