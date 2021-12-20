package com.account.service.controllers;

import java.net.URI;
import java.time.LocalDate;
import java.util.Collections;
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
import com.account.service.entity.LoginResponse;
import com.account.service.entity.Transaction;
import com.account.service.entity.User;
import com.account.service.services.AccountService;
import com.account.service.services.LoginService;
import com.account.service.services.TransactionService;
import com.account.service.utils.AccountHelper;

@RestController
@RequestMapping(path = "/api/account-service")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AccountController {
	@Autowired
	private AccountService service;

	@Autowired
	private TransactionService transaction;
	
	@Autowired
	private LoginService loginService;

	@PostMapping(path = "accounts/add-account")
	public ResponseEntity<Account> addAccount(@RequestBody Account account) {
		if(account != null) {
			account.setAccountNumber(AccountHelper.generateAccountNum());
			account.setDate(LocalDate.now());
			account.setBankName("SBM");
			account.setBalance(0.0);
		} else {
			System.err.println("Invalid request!");
		}
		Account response = service.addAccount(account);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(account.getAccountNumber())
				.toUri();
		return ResponseEntity.created(location).body(response);
	}
	
	@GetMapping(path = "accounts/{id}")
	public Optional<Account> getAccountById(@PathVariable Long id) {
		return this.service.getAccountById(id);
	}
	

	@GetMapping(path = "/login")
	public ResponseEntity<LoginResponse> login(@RequestParam String username, @RequestParam String password) {
		return this.loginService.login(username, password);
	}

	@GetMapping(path = "accounts/{accountNumber}/get-transactions/sort")
	public List<Transaction> getSortedStatementBetweenDates(
			@PathVariable Long accountNumber,
			@RequestParam @DateTimeFormat(iso = ISO.DATE) LocalDate start_date, 
			@RequestParam @DateTimeFormat(iso = ISO.DATE) LocalDate end_date,
			@RequestParam String sort,
			@RequestParam String sort_order) {
		try {
			Sort sortObj = sort_order.equalsIgnoreCase("desc") ? Sort.by(sort).descending() : Sort.by(sort);
			List<Transaction> transactions = this.transaction.findByAccountNumberAndTransactionDateBetween(accountNumber, start_date, end_date, sortObj);
			return transactions;
		} catch (Exception e) {
			return Collections.emptyList();
		}
	}

	@GetMapping(path = "accounts/get-all-accounts")
	public List<Account> getAllAccounts() {
		return this.service.getAllAccounts();
	}
	
	@GetMapping(path = "accounts/get-sorted-accounts/{accountType}")
	public List<Account> sortAccountsByDate(@PathVariable String accountType) {
		return this.service.findByAccountType(accountType);
	}

//	@GetMapping(path = "accounts/get-sorted-accounts")
//	public List<Account> sortAccountsByDate(
//			@RequestParam @DateTimeFormat(iso = ISO.DATE) LocalDate start_date, 
//			@RequestParam @DateTimeFormat(iso = ISO.DATE) LocalDate end_date,
//			@RequestParam String sort,
//			@RequestParam String sort_order,
//			@RequestParam String accountType) {
//		try {
//			Sort sortObj = sort_order.equalsIgnoreCase("desc") ? Sort.by(sort).descending() : Sort.by(sort);
//			List<Account> accounts = null;
//			if(accountType.equalsIgnoreCase("all"))
//				accounts = this.service.findByDateBetween(start_date, end_date, sortObj);
//			else 
//				accounts = this.service.findByAccountTypeAndDateBetween(accountType, start_date, end_date, sortObj);
//			return accounts;
//		} catch (Exception e) {
//			return Collections.emptyList();
//		}
//	}
//	
	@GetMapping(path = "accounts/{accountNumber}/get-all-transactions")
	public List<Transaction> getAllStatementsOfAccount(@PathVariable Long accountNumber) {
		return this.service.getAllTransactionsByAccountNumber(accountNumber);
	}

	@GetMapping(path = "accounts/{accountNumber}/balance")
	public Double getAccountBalance(@PathVariable Long accountNumber) {
		return this.service.getAccountBalance(accountNumber);
	}

	@PutMapping(path = "accounts/{accountNumber}/transaction")
	public ResponseEntity<Transaction> doTransaction( @PathVariable Long accountNumber,
			@RequestBody Transaction transaction) {
		return this.service.doTransaction(accountNumber,transaction);
	}
	
	@GetMapping(path = "accounts/{accountNumber}/score")
	public ResponseEntity<Object> getAccountBalanceAndScore(@PathVariable Long accountNumber) {
		Optional<Account> account = this.service.getAccountById(accountNumber);
		Map<String, Object> map = new HashMap<>();
		if(account.isPresent()) {
			map.put("balance", account.get().getBalance());
			map.put("score", account.get().getScore());
		}
		return ResponseEntity.ok(map);
	}
	
	@PostMapping(path = "/add-admin-user")
	public ResponseEntity<User> addAdminUser(@RequestBody User user) {
		User response = this.loginService.createAdminUser(user);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(user.getId())
				.toUri();
		return ResponseEntity.created(location).body(response);
	}
	
	@GetMapping(path = "/get-all-users")
	public List<User> getAllUsersOfRoles() {
		return this.loginService.getAllUsers();
	}
	
	@GetMapping(path = "/get-users-by-role/{role}")
	public List<User> getUsersByRole(@PathVariable String role) {
		return this.loginService.getUsersOfRole(role);
	}
}
