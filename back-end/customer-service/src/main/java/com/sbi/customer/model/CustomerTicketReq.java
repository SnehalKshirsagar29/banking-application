package com.sbi.customer.model;


import lombok.Data;

@Data
public class CustomerTicketReq {
	
	private Long id;
	private String emailAddress;
	private String message;
	private Long phone;
	private String status;

	
}
