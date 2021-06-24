package com.sonatrach.dz.message.response;

public class ResponseMessage {
	private String message;
	private Integer userId;

	public ResponseMessage(String message,Integer id) {
		this.message = message;
		this.userId=id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	
	
}
