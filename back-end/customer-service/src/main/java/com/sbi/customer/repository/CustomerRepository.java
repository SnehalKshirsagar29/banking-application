package com.sbi.customer.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sbi.customer.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long>{

  List<Customer>findAllByCustomerId(Long id);
  
	@Query(nativeQuery = true, 
			value = "update customer_ticket set status=:status where id=:id")
	@Modifying
	@Transactional
	int updateCustomerTicket(@Param("id") long id, @Param("status") String status);
}
