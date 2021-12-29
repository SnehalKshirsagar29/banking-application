package com.sbi.customer.controller;

import java.net.URI;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.sbi.customer.entity.Customer;
import com.sbi.customer.model.CustomerTicketReq;
import com.sbi.customer.service.CustomerService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = "api/customer-service/")
public class CustomerController {

	@Autowired
	private CustomerService service;
   	private final String TOPIC = "topic-notify";

	@PostMapping(path = "ticket/customer/{customerId}")
	public ResponseEntity<CustomerTicketReq> addCustomerTicket(@RequestBody CustomerTicketReq customerTicketReq,
			@PathVariable Long customerId) {
		this.service.addCustomerTicket(customerTicketReq);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{customerId}")
				.buildAndExpand(customerTicketReq.getId()).toUri();
		Map<String, Object> map = new HashMap<String, Object>();
		System.out.println("check customer id:" + customerTicketReq);
		map.put("customerId", customerTicketReq.getCustomerId());
		map.put("notification_date",  LocalDate.now());
		map.put("message", "Dear Customer, Your Customer Ticket Id is Generated for this "
				+ customerTicketReq.getCustomerId() + " is successful");
		map.put("email_address", customerTicketReq.getEmailAddress());
		map.put("phone", customerTicketReq.getPhone());
		this.produceRequest(TOPIC, map);
		return ResponseEntity.created(location).body(customerTicketReq);
	}

	@Autowired
	private KafkaTemplate<String, Object> kafkaTemplate;

	public void produceRequest(String topic, Object payload) {
		System.out.println("Topic : " + topic + " : msg : " + payload);
		System.out.println("kafkaTemplate : " + kafkaTemplate);
		try {
			kafkaTemplate.send(topic, payload);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@GetMapping("customer/{Customer_id}")
	public List<Customer> getAllTicket(@PathVariable Long Customer_id) {
		List<Customer> resp = service.findByCustomerId(Customer_id);
		return resp;
	}
	
	@GetMapping("getAllcustomer")
	public List<Customer> getAllcustomer() {
		List<Customer> resp = service.getAllCustomer();
		return resp;
	}
	

	@GetMapping("customer/{Customer_id}/ticket/{ticketid}")
	public Optional<Customer> getuserTicket(@PathVariable String Customer_id, @PathVariable Long ticketid) {
		Optional<Customer> customer = service.findByUserticketId(ticketid);
		return customer;
	}
    
	@PutMapping(path = "customer/update/{id}")
	public ResponseEntity<String> updateMobileNumber(@RequestBody Customer customer ,@PathVariable("id") long id) {   
		this.service.updatecustomerStatus(id,customer.getStatus());
	 return  ResponseEntity.ok().body("Updated status ");
	}


}
