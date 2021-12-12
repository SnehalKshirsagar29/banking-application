package com.example.demo.controller;

import java.net.URI;
import java.time.LocalDate;
import java.util.*;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import com.example.demo.entity.LoanEntity;
import com.example.demo.service.LoanService;




@RestController
@CrossOrigin
@RequestMapping(path = "/api")
public class LoanController {

	@Autowired
	private LoanService service;
	
	LocalDate localDate = LocalDate.now();
	
	@GetMapping(path= "/customer")
	public List<LoanEntity> getAll()
	{
		return this.service.getAll();
	}
	
	@PostMapping(path = "/loans")
	public ResponseEntity<LoanEntity> addEntity(@RequestBody LoanEntity loan){
		this.service.addEntity(loan);
		URI location= ServletUriComponentsBuilder.fromCurrentRequest()
						.path("/{id}")
						.buildAndExpand(loan.getId()).toUri();
		
		Map<String, Object> map = new HashMap<String, Object> ();
		map.put("customerId", loan.getAccId());
		map.put("notification_date", localDate);
		map.put("message", "Dear Customer, Your loan application for "+loan.getLoan_amount()+" amount is successful");
		map.put("email_address", "abc@gmail");
		map.put("phone", "1234567890");
		produceRequest("notificationservice", map);
		
		return ResponseEntity.created(location).body(loan);
	}
	

	@GetMapping(path="/customer/{acc_id}/loans/{id}")
	public LoanEntity getLoanEntityById(@PathVariable long id){
		return this.service.getLoanEntityById(id);
	}
	

	@GetMapping(path="/customer/{id}")
	public LoanEntity getLoanById(@PathVariable long id){
		return this.service.getLoanEntityById(id);
	}
	
	@GetMapping(path="/customer/{acc_id}/loans")
	public List<LoanEntity> getLoanEntityByCustId(@PathVariable long acc_id){
		return this.service.findByAccID(acc_id);
	}
	
	@PatchMapping(path = "/loans/update/{id}/{newstatus}")
	public ResponseEntity<String> updateMobileNumber(@PathVariable("loan_id") long loan_id, 
			@PathVariable("newstatus") long newstatus) {

		this.service.updateLoanStatus(loan_id, newstatus);

	 return  ResponseEntity.ok().body("Updated status ");
	}
	
	@Autowired
	private KafkaTemplate<String, Object> kafkaTemplate;

	public void produceRequest(String topic, Object payload) {
	System.out.println("Topic : "+topic+" : msg : "+payload);
	System.out.println("kafkaTemplate : "+kafkaTemplate);
	try {
	kafkaTemplate.send(topic, payload);
	} catch (Exception e) {
	e.printStackTrace();
	}
	}
}
