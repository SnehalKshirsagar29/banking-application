package com.account.service.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.account.service.entity.Transaction;
import com.account.service.repositories.TransactionServiceRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TransactionService {

	private TransactionServiceRepository repo;
	
	public List<Transaction> getAllStatements() {
		return this.repo.findAll();
	}
	
	public List<Transaction> findByAccountNumberAndTransactionDateBetween(Long accountNumber, LocalDate startDate, LocalDate endDate, Sort sortObj) {
		return this.repo.findByAccountNumberAndTransactionDateBetween(accountNumber, startDate, endDate, sortObj);
	}
	
	@Autowired
	private KafkaTemplate<String, Object> kafkaTemplate;
	 
	public void produceRequest(String topic, Object payload) {
		try {
			kafkaTemplate.send(topic, payload);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}   
}
