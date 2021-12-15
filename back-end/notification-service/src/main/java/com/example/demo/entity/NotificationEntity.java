package com.example.demo.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.lang.NonNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "notification_service")
public class NotificationEntity {
	
	@Id
	@Column(name = "id")
	private Long id;
	
	@Column(name = "customerId",nullable = false)
	@NonNull
    private Long customerId;
	
	@Column(name = "notification_date",nullable = false)
	@DateTimeFormat(iso = ISO.DATE)
	@NonNull
    private LocalDate notification_date;  
	
	@Column(name = "message",nullable = false)
	@NonNull
    private String message;
	
	
	@Column(name = "email_address",nullable = false)
	@NonNull
    private String email_address;  
	
	@Column(name = "phone",nullable = false)

	//@Schema(description = "Registred Ten Digit Mobile Number")
	private String phone;
	
}
