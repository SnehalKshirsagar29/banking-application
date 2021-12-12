package com.account.service.controllers;

import java.net.URI;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.account.service.entity.Account;
import com.account.service.entity.Transaction;
import com.account.service.services.AccountService;
import com.account.service.services.TransactionService;
import com.account.service.utils.AccountHelper;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AccountController {

	@Autowired
	private AccountService service;

	@Autowired
	private TransactionService transaction;

	@PostMapping(path = "/accounts")
	public ResponseEntity<Account> addAccount(@RequestBody Account account) {
		if(account != null) {
			account.setAccountNumber(AccountHelper.generateAccountNum());
			account.setDate(LocalDate.now());
		}
		Account acc = service.addAccount(account);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(account.getAccountNumber())
				.toUri();
		return ResponseEntity.created(location).body(acc);
	}
	
	@GetMapping(path = "/account/{id}")
	public Optional<Account> getAccountById(@PathVariable Long id) {
		return this.service.getAccountById(id);
	}
	

	@GetMapping(path = "/login")
	public ResponseEntity<Object> checkLogin(@RequestParam String username, @RequestParam Long passwd) {
		System.out.println("username : "+username+" : passwd : "+passwd);
		Map<String, String> map = new HashMap<>();
		if(username.equalsIgnoreCase("ganesh") && passwd == 123) {
			map.put("username", username);
			map.put("passwd", passwd.toString());
			map.put("accountNumber", "111103");
			map.put("msg", "Success");
			return ResponseEntity.ok(map);
		} else {
			map.put("msg", "Fail");
			return ResponseEntity.ok(map);
		}
	}

	@GetMapping(path = "/account/{accountNumber}/statements/sort")
	public List<Transaction> getSortedStatementBetweenDates(
			@PathVariable Long accountNumber,
			@RequestParam @DateTimeFormat(iso = ISO.DATE) LocalDate start_date, 
			@RequestParam @DateTimeFormat(iso = ISO.DATE) LocalDate end_date,
			@RequestParam String sort,
			@RequestParam String sort_order) {
		// GET - http://<domain>:<port>/api/accounts/{id}/statement?start_date=<data>&&end_date=<date>&&sort=<amount>&&sort_order=<asc|desc>
		//http://localhost:2222/api/accounts/101/statement?start_date=2020-08-07&&end_date=2021-09-08&&sort=20000&&sort_order=asc&size=2&page=0
		try {
			Sort sortObj = sort_order.equalsIgnoreCase("desc") ? Sort.by(sort).descending() : Sort.by(sort);
			List<Transaction> transactions = this.transaction.findByAccountNumberAndTransactionDateBetween(accountNumber, start_date, end_date, sortObj);
			return transactions;
		} catch (Exception e) {
			return null;
		}
	}

	@GetMapping(path = "/account/statements")
	public List<Account> getAllAccounts() {
		return this.service.getAllAccounts();
	}

	@GetMapping(path = "/account/{accId}/statements")
	public List<Transaction> getAllStatementsOfAccount(@PathVariable Long accId) {
		return this.service.getAllTransactionsByAccId(accId);
	}

	@GetMapping(path = "/account/balance/{id}")
	public Double getAccountBalance(@PathVariable Long id) {
		return this.service.getAccountBalance(id);
	}

	@PutMapping(path = "/account/transaction/{accountNumber}")
	public ResponseEntity<Transaction> doTransaction( @PathVariable Long accountNumber,
			@RequestBody Transaction transaction) {
		//return this.service.doTransaction(accountNumber,transaction);
		ResponseEntity<Transaction> response = this.service.doTransaction(accountNumber,transaction);
		Map<String, String> map = new HashMap<>();
			map.put("customerId", "123456");
			map.put("date", "Jadhav");
			
			map.put("message", "Hi form Account Service...");
		this.transaction.produceRequest("booking", map);
		return response;
	}
	
	@GetMapping(path = "/account/score/{id}")
	public Map<String, Object> getAccountBalanceAndScore(@PathVariable Long id) {
		Optional<Account> account = this.service.getAccountById(id);
		Map<String, Object> map = null;
		if(account.isPresent()) {
			map = new HashMap<>();
			map.put("balance", account.get().getBalance());
			map.put("score", account.get().getScore());
		}
		return map;
	}
}
