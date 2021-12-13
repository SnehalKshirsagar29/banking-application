package com.example.demo.repos;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.NotificationEntity;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {


	List<NotificationEntity> findByCustomerId(Long customerId);

	@Query(nativeQuery = true, 
			value ="SELECT * FROM notification_service WHERE customer_id=:customerId AND id=:notificationId")
	@Modifying
	List<NotificationEntity> getNotificationByCustomerIdAndNotificationId(@Param("customerId") Long customerId, @Param("notificationId")  Long notificationId);
	
}
