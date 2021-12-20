package com.account.service.entity;

public class LoginResponse {	
	private String username;
	private Long accountNumber;
	private String firstName;
	private String lastName;
	private String msg;
	private String roleName;
	
	public LoginResponse(String username, Long accountNumber, 
			String firstName, String lastName, String msg, String roleName) {
		this.username = username;
		this.accountNumber = accountNumber;
		this.firstName = firstName;
		this.lastName = lastName;
		this.msg = msg;
		this.roleName = roleName;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Long getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
}
