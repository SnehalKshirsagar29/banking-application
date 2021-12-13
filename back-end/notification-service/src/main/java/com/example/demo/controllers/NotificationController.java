package com.example.demo.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.demo.entity.NotificationEntity;
import com.example.demo.service.NotificationService;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class NotificationController {

	
	@Autowired
	private NotificationService service;
	
	@GetMapping(path = "/welcome")
	public String getWelcomedMsg(){
		return "Welcome in Bank App";
	}

	@GetMapping(path = "/notifications")
	public List<NotificationEntity> getAllNotifications(){
		return service.getAllNotification();
	}
	
	
	/*
	 * GET http://<domain>:<port>/api/customer/{customerid}
	 *  [ { "id": <value>,
	 * "email_address": <value>, "message": <value>, "phone": <value>, "status":
	 * <NEW|IN-PROCESS|RESOLVED|CLOSED> } ]
	 */
	
	@GetMapping(path = "/notifications/customer/{customerid}")
	public List<NotificationEntity> getNotificationsByCustomerId(@PathVariable("customerid") Long customerId){
		return service.getNotificationsByCustomerId(customerId);
	}

	
	/*
	 * GET http://<domain>:<port>/api/customer/{customerid}/notification/{id} 
	 * {
	 * "id": <value>, "email_address": <value>, "message": <value>, "phone": <value>
	 * }
	 */
	
	@GetMapping(path= "/customer/{customerid}/notification/{id}")
	public List<NotificationEntity> getNotificationByCustomerIdAndNotificationId(
			@PathVariable("customerid") Long customerId,
			@PathVariable("id") Long notificationId)
	{
		return service.getNotificationByCustomerIdAndNotificationId(customerId,notificationId);
	}
	
	/*@PostMapping(path = "notifications/customer/{customerid}")
	public ResponseEntity<NotificationEntity> addEntity(@RequestBody NotificationEntity notification,@PathVariable("customerid") Long customerId ){
		
		System.out.println(notification.getEmail_address()+"\n"+notification.getMessage()+"\n"+notification.getCustomerId());
		
		NotificationEntity addedObject = this.service.addEntity(notification);
		
		if(addedObject!=null) {
		URI location= ServletUriComponentsBuilder.fromCurrentRequest()
				  .path("/{id}")
		          .buildAndExpand(notification.getId())
		          .toUri();  

		return ResponseEntity.created(location).body(notification);  
		} else {
			
			 throw new RuntimeException("Resource With Id Already Exisits");
		}
				
	}*/
	
}
