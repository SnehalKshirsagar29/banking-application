package com.example.demo.entity;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.loader.entity.plan.AbstractLoadPlanBasedEntityLoader;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name= "Loan_Details1")

@Data
@AllArgsConstructor
@NoArgsConstructor

public class LoanEntity {

	@Column(name= "acc_id")
	private Long accId;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name= "id")
	private Long id;
	
	@Column(name= "loan_amount")
	private Double loan_amount;
	
	@Column(name= "loan_balance")
	private Double loan_balance;
	
	@Column(name= "tenure")
	private  Integer tenure;
	
	@Column(name= "tenure_balance")
	private Integer tenure_balance;
	
	@Column(name= "status")
	private String status;
	
	@Column(name= "score")
	private Integer score;

}
