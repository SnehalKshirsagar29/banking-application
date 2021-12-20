package com.account.service.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.account.service.entity.Account;
import com.account.service.entity.NotificationEntity;
import com.account.service.entity.Transaction;
import com.account.service.entity.User;
import com.account.service.exceptions.AccountNotFoundException;
import com.account.service.repositories.AccountServiceRepository;
import com.account.service.repositories.TransactionServiceRepository;
import com.account.service.repositories.UserServiceRepository;
import com.account.service.utils.AccountHelper;
import com.account.service.utils.TransactionType;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccountService {

	private final String TOPIC = "topic-notify";
	private AccountServiceRepository repo;
	private TransactionServiceRepository transaction;
	private UserServiceRepository userRepo;
	private TransactionService transactionService;
	
	public Account addAccount(Account account) {
		Account accountObj = this.repo.save(account);
		User user = AccountHelper.generateUserObject(accountObj);
		if(user != null)
			this.userRepo.save(user);
			
		return accountObj;
	}
	
	public Optional<Account> getAccountById(Long id) {
		return Optional.of(this.repo.getById(id));
	}
	
	public List<Account> getAllAccounts() {
		return this.repo.findAll();
	}
	
	public List<Transaction> getAllTransactionsByAccountNumber(Long accId) {
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

	public List<Account> findByDateBetween(LocalDate start_date, LocalDate end_date, Sort sortObj) {
		
		return this.repo.findByDateBetween(start_date,end_date,sortObj);
	}

//	public List<Account> findByAccountTypeAndDateBetween(String accountType, LocalDate start_date, LocalDate end_date,
//			Sort sortObj) {
//		return this.repo.findByAccountTypeAndDateBetween(accountType, start_date, end_date, sortObj);
//	}

	public List<Account> findByAccountType(String accountType) {
		return this.repo.findByAccountType(accountType);
	}
}
