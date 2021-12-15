package com.example.demo.service;

import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.example.demo.entity.NotificationEntity;
import com.example.demo.repos.NotificationRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationServiceForKafka {
	private final String TOPIC = "topic-notify";
	@Autowired
	private NotificationRepository repos;
	
	@KafkaListener(topics = TOPIC, groupId = "group-id")
	public void listen(NotificationEntity entity) {
		
	  Long  randomId = ThreadLocalRandom.current().nextLong(1, 1000000); 
	   
	   entity.setId(randomId);
	   try {
		   this.repos.save(entity);
	   }
	   catch(DataIntegrityViolationException e)
	   {
		   System.out.println("Unable to save notification for customer:"+entity.getCustomerId());
		// LOGGER.error("Unable to save notification for customer:"+entity.getCustomerId(),e.getMessage())
	   }
	}
	
	
	

}
