package com.account.service.entity;

import java.time.LocalDate;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import com.account.service.utils.TransactionType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="transaction_sbi")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Transaction {
	@Id
	@Column(name="transactionId")
	private String transactionId = UUID.randomUUID().toString().toUpperCase().replace("-", "");
	
	@Column(name="accountNumber")
	private Long accountNumber;
	
	@Enumerated(EnumType.STRING)
	@Column(name="transactionType")
	private TransactionType transactionType;
	
	@Column(name="amount")
	private Double amount;
	
	@Column(name="comment")
	private String comment;
	
	@Column(name="transactionDate")
    @DateTimeFormat(iso = ISO.DATE)
    private LocalDate transactionDate;

	@Override
	public String toString() {
		return "Statement [transactionId=" + transactionId + ", accountNumber=" + accountNumber + ", transactionType="
				+ transactionType + ", amount=" + amount + ", comment=" + comment + ", transactionDate="
				+ transactionDate + "]";
	}
	
}
