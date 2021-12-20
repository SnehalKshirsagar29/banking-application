package com.account.service.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.account.service.entity.User;

public interface UserServiceRepository extends JpaRepository<User, Long> {

	User getByEmailId(String username);

	List<User> getByRoleName(String roleName);
	
}
