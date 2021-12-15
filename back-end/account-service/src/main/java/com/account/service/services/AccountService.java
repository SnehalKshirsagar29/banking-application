package com.account.service.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.account.service.entity.Account;
import com.account.service.entity.NotificationEntity;
import com.account.service.entity.Transaction;
import com.account.service.exceptions.AccountNotFoundException;
import com.account.service.repositories.AccountServiceRepository;
import com.account.service.repositories.TransactionServiceRepository;
import com.account.service.utils.TransactionType;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccountService {

	private final String TOPIC = "topic-notify";
	private AccountServiceRepository repo;
	private TransactionServiceRepository transaction;
	
	private TransactionService transactionService;
	
	public Account addAccount(Account account) {
		return this.repo.save(account);
	}
	
	public Optional<Account> getAccountById(Long id) {
		return Optional.of(this.repo.getById(id));
	}
	
	public List<Account> getAllAccounts() {
		return this.repo.findAll();
	}
	
	public List<Transaction> getAllTransactionsByAccId(Long accId) {
		return this.transaction.findAllByAccountNumber(accId);
	}
	
	public Double getAccountBalance(Long id) {
		return this.repo.getById(id).getBalance();
	}
	
	public ResponseEntity<Transaction> doTransaction(Long accountNumber, Transaction transaction) {
		Transaction response = null;
		if(transaction != null && transaction.getAmount() >= Double.valueOf(0)) {
			Account account = this.repo.getById(accountNumber);
			if(account != null) {
				Double balance = account.getBalance();
				if(transaction.getTransactionType() == TransactionType.CREDIT) {
					account.setBalance(balance+transaction.getAmount());
				} else if(transaction.getTransactionType() == TransactionType.DEBIT) {
					if(balance >= transaction.getAmount()) {
					account.setBalance(balance-transaction.getAmount());
					} else {
						throw new AccountNotFoundException("Insufficient balance! ");
					}
				}
				Account updatedAccount = this.repo.save(account);
				if(updatedAccount != null) {
					transaction.setTransactionDate(LocalDate.now());
					response = this.transaction.save(transaction);
				}
				String fromOrTo = (transaction.getTransactionType() == TransactionType.CREDIT) ? "to" : "from";
				String msg = "You have "+transaction.getTransactionType().toString().toLowerCase()+"ed Rs. "+transaction.getAmount()+" "+fromOrTo+" account : "+account.getAccountNumber();
				NotificationEntity note = new NotificationEntity(account.getAccountNumber(), LocalDate.now(), msg, account.getEmail(), account.getMobileNumber());
//				Map<String, Object> map = new HashMap<>();
//				map.put("customerId", account.getAccountNumber());
//				map.put("notification_date", LocalDate.now());
//				map.put("message", "Transaction done successfully!");
//				map.put("email_address", account.getEmail());
//				map.put("phone", account.getMobileNumber());
				this.transactionService.produceRequest(TOPIC, note);
			} else {
				throw new AccountNotFoundException("Account not found! : "+accountNumber);
			}
		} else {
			throw new AccountNotFoundException("Invalid data found!");
		}
		return ResponseEntity.ok(response);
	}

	public Account getAccountByEmail(String username) {
		return this.repo.getByEmail(username);
	}
}
