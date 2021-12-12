package com.example.demo.repos;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.LoanEntity;

public interface LoanRepository extends JpaRepository<LoanEntity, Long> {

	List<LoanEntity> findByaccId(Long accId);
	
	@Query(nativeQuery = true, 
			value = "update Loan_Details set status=:newstatus where loan_id=:srchloan_Id")
	@Modifying
	@Transactional
	int updateLoanStatus(@Param("srchloan_Id") long id, @Param("newstatus") long newstatus);
}
