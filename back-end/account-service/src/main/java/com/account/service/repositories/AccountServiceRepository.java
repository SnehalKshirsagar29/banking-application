package com.account.service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.account.service.entity.Account;

public interface AccountServiceRepository extends JpaRepository<Account, Long> {

	Account getByEmail(String username);

}
