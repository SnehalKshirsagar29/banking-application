package com.account.service.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.account.service.entity.Account;

public interface AccountServiceRepository extends JpaRepository<Account, Long> {

	Account getByEmail(String username);

	List<Account> findByDateBetween(LocalDate start_date, LocalDate end_date, Sort sortObj);

//	List<Account> findByAccountTypeAndDateBetween(String accountType, LocalDate start_date, LocalDate end_date,
//			Sort sortObj);

	List<Account> findByAccountType(String accountType);

}
