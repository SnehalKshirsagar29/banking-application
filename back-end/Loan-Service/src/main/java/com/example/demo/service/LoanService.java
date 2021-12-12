package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.LoanEntity;
import com.example.demo.repos.LoanRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LoanService {

	
	private LoanRepository repos;
	
	public List<LoanEntity> getAll()
	{
		return this.repos.findAll();
	}
	
	public LoanEntity getLoanEntityById(Long id){
		return this.repos.findById(id)
				.orElseThrow(()->new RuntimeException("Loan not found! with givenId : "+id));
	}
	
	public List<LoanEntity> findByAccID(Long acc_id){

		return  this.repos.findByaccId(acc_id);
	}
	
	public LoanEntity addEntity(LoanEntity entity) {
		 
		return (LoanEntity) this.repos.save(entity);
	}
	
	public int updateLoanStatus(Long loan_id, long newstatus) {
		
		return this.repos.updateLoanStatus(loan_id,newstatus);
	}
}
