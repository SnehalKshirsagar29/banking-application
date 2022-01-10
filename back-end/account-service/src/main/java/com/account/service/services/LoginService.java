package com.account.service.services;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.account.service.entity.LoginResponse;
import com.account.service.entity.User;
import com.account.service.exceptions.AccountNotFoundException;
import com.account.service.jwt.JwtUtil;
import com.account.service.repositories.UserServiceRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LoginService {
	private UserServiceRepository userRepo;
	
	private AccountService accountService;
	
	//private TokenProvider tokenProvider;
	private JwtUtil jwtUtil;
	
	public ResponseEntity<LoginResponse> login(@RequestParam String username, @RequestParam String password) {
		System.out.println("username : "+username+" : passwd : "+password);
		LoginResponse response = null;
		String msg = null;
		if(username != null && !username.isEmpty()) {
			User user = this.userRepo.getByEmailId(username);
			if(user != null) {
				if(user.getPassword().equals(password)) {
					Long accountNum = user.getRoleName().equals("User") 
							? accountService.getAccountByEmail(username).getAccountNumber() 
							: null;
					String authenticationToken = jwtUtil.generateToken(username);
					System.out.println("authenticationToken : "+authenticationToken);
					response = new LoginResponse(
							user.getEmailId(),accountNum, user.getFirstName(), user.getLastName(), "Success", user.getRoleName(), authenticationToken);
					return ResponseEntity.ok(response);
				} else {
					msg = "Invalid credentials!";
					response = new LoginResponse(username, null, null, null, msg, null, null);
					throw new AccountNotFoundException("Invalid credentials! ");
				}
			} else {
				msg = "Account not found! Please create account first.";
				response = new LoginResponse(username, null, null, null, msg, null, null);
				throw new AccountNotFoundException("Account not found! Please create account first.");
			}
		}
		return ResponseEntity.ok(response);
	}
	
	public User getUserByEmailId(String emailId) {
		return this.userRepo.getByEmailId(emailId);
	}
	
	public User createAdminUser(User user) {
		return this.userRepo.save(user);
	}

	public List<User> getAllUsers() {
		return this.userRepo.findAll();
	}

	public List<User> getUsersOfRole(String role) {
		return this.userRepo.getByRoleName(role);
	}
}
