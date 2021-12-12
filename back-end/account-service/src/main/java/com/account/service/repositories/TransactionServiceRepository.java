package com.account.service.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.account.service.entity.Transaction;

public interface TransactionServiceRepository extends JpaRepository<Transaction, Long> {

	List<Transaction> findByAccountNumberAndTransactionDateBetween(Long accountNumber, LocalDate startDate, LocalDate endDate, Sort sortObj);

	List<Transaction> findAllByAccountNumber(Long accId);
	
	//Page<Transaction> findAllByTransactionDateBetween(LocalDate startDate, LocalDate endDate, Pageable pageable);


}
