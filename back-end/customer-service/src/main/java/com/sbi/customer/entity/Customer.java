package com.sbi.customer.entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="customer_ticket")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	@JsonIgnore
	@Column(name="customerId")
	private Long customerId;
	@Column(name="message")
    private String message;
	@Column(name="phone")
    private Long phone;
	@Column(name="email_address")
    private String emailAddress;
	@Column(name="status")
    private String status;
}
