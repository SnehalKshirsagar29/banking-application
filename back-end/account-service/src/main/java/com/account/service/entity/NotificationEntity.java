package com.account.service.entity;

import java.time.LocalDate;

public class NotificationEntity {
	private Long customerId;
    private LocalDate notification_date;  
    private String message;
    private String email_address;  
	private String phone;
    public NotificationEntity(Long customerId, LocalDate notification_date, String message, String email_address, String phone) {
        this.customerId = customerId;
        this.notification_date = notification_date;
        this.message = message;
        this.email_address = email_address;
        this.phone = phone;
    }
	
    @Override
	public String toString() {
		return "Notification [customerId=" + customerId + ", notification_date=" + notification_date + ", message="
				+ message + ", email_address=" + email_address + ", phone=" + phone + "]";
	}

	public Long getCustomerId() {
		return customerId;
	}
	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}
	public LocalDate getNotification_date() {
		return notification_date;
	}
	public void setNotification_date(LocalDate notification_date) {
		this.notification_date = notification_date;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getEmail_address() {
		return email_address;
	}
	public void setEmail_address(String email_address) {
		this.email_address = email_address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
}
