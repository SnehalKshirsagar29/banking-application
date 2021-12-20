package com.account.service.entity;

import java.time.LocalDate;
import java.util.concurrent.ThreadLocalRandom;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name="bank_user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
	@Id
	@Column(name="id")
	private Long id = ThreadLocalRandom.current().nextLong(1, 1000000);
	
	@Column(name="firstName")
    private String firstName;
	
    @Column(name="lastName")
    private String lastName;
    
    @Column(name="middleName")
    private String middleName;
    
    @Column(name="emailId")
    private String emailId;
    
    @Column(name="roleName")
    private String roleName;
    
    @Column(name="contactNumber")
    private String contactNumber;
    
    @Column(name="age")
    private int age;
    
    @Column(name="date")
    @DateTimeFormat(iso = ISO.DATE)
    private LocalDate date = LocalDate.now();
    
    @Column(name="password")
    private String password;
}
