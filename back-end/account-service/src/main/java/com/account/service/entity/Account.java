package com.account.service.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="bank_account")
@Data
@AllArgsConstructor
@NoArgsConstructor
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Account {
	@Id
	@Column(name="accountNumber")
	private Long accountNumber;
	
	@Column(name="firstName")
    private String firstName;
	
    @Column(name="lastName")
    private String lastName;
    
    @Column(name="bankName")
    private String bankName;
    
    @Column(name="branchName")
    private String branchName;
    
    @Column(name="ifscCode")
    private String ifscCode;
    
    @Column(name="accountType")
    private String accountType;
    
    @Column(name="balance")
    private Double balance;
    
    @Column(name="email")
    private String email;
    
    @Column(name="mobileNumber")
    private String mobileNumber;
    
    @Column(name="date")
    @DateTimeFormat(iso = ISO.DATE)
    private LocalDate date;
    
    @Column(name="score")
    private long score;
    
    @Column(name="password")
    private long password;
}
