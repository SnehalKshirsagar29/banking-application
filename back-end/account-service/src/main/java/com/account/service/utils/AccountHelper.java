package com.account.service.utils;

import java.time.LocalDate;
import java.util.concurrent.ThreadLocalRandom;

import com.account.service.entity.Account;
import com.account.service.entity.User;

public class AccountHelper {

	public static long generateAccountNum() {
		  ThreadLocalRandom random = ThreadLocalRandom.current();
		  return random.nextLong(10_000_000_000L, 100_000_000_000L);
	}

	public static User generateUserObject(Account accountObj) {
		return new User (
		ThreadLocalRandom.current().nextLong(1, 1000000),
		accountObj.getFirstName(),
		accountObj.getLastName(),
		"",
		accountObj.getEmail(),
		"User",
		accountObj.getMobileNumber(),
		0, 
		LocalDate.now(),
		accountObj.getPassword()
		);
	}
	
//	public static Map<String, Object> getNotificationRequest(Account account) {
//		  try {
//			  Map<String, Object> request = new HashMap<>();
//			  request.put("customerId", account.getAccountNumber());
//			  return request;
//		} catch (Exception e) {
//			return new HashMap<String, String>();
//		}
//	}
	
	
//	public Statement generateAccountStatement(Account account, Double amount, TransactionType transactionType, String comment) {
//		Statement stmt = new Statement();
//		stmt.setTransactionId(UUID.randomUUID().toString());
//		stmt.setAccountNo(account.getAccountNo());
//		//stmt.setAccountHolderName(account.getFirstName()+" "+account.getLastName());
//		stmt.setComment(comment);
//		stmt.setTransactionDate(LocalDate.now());
//		
//		if(transactionType == TransactionType.CREDIT)
//			stmt.setDeposit(amount);
//		if(transactionType == TransactionType.DEBIT)
//			stmt.setWithdraw(amount);
//		return stmt;
//	}
}
