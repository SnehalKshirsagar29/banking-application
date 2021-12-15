package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.NotificationEntity;
import com.example.demo.repos.NotificationRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationService {
	
	
	@Autowired
	private NotificationRepository repos;
	

	
	public List<NotificationEntity> getAllNotification() {
		// TODO Auto-generated method stub
		return this.repos.findAll();
	}

	public List<NotificationEntity> getNotificationsByCustomerId(Long customerId) {
		// TODO Auto-generated method stub
		return this.repos.findByCustomerId(customerId);
	}

	public List<NotificationEntity> getNotificationByCustomerIdAndNotificationId(Long customerId, Long notificationId) {
		// TODO Auto-generated method stub
		
		return this.repos.getNotificationByCustomerIdAndNotificationId(customerId,notificationId);
	}
	
	
	/*public NotificationEntity addEntity(NotificationEntity entity) {
		
		System.out.println(entity);
		
		NotificationEntity nty = kafkaService.listen(entity)

		Optional<NotificationEntity> isAdded =this.repos.findById(entity.getCustomerId());
                                                                     
		
		if(isAdded.isEmpty()) {
			this.repos.save(entity);

			System.out.println("IS Empty Check");
			return entity;

		} else {
			
			return null;
		}
		
		
	}*/

}
