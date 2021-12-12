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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.sbi.customer.entity.Customer;
import com.sbi.customer.model.CustomerTicketReq;
import com.sbi.customer.service.CustomerService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = "api/")
public class CustomerController {

	
	@Autowired
	private CustomerService service;
	LocalDate localDate = LocalDate.now();
	
	
	@PostMapping(path="ticket/customer/{customerId}")
	public ResponseEntity<CustomerTicketReq> addCustomerTicket(@RequestBody CustomerTicketReq customerTicketReq,@PathVariable String customerId){
		this.service.addCustomerTicket(customerTicketReq);
		URI location = ServletUriComponentsBuilder
				      .fromCurrentRequest()
				      .path("/{id}")
				      .buildAndExpand(customerTicketReq.getId())
				      .toUri();
		Map<String,Object> map = new HashMap<String,Object>();
		System.out.println("check customer id:"+customerTicketReq);
		map.put("customerId", customerTicketReq.getId());
		map.put("notification_date", localDate);
		map.put("message", "Dear Customer, Your Customer Ticket Id is Generated for this "+customerTicketReq.getId()+" is successful");
		map.put("email_address", customerTicketReq.getEmailAddress());
		map.put("phone", customerTicketReq.getPhone());
	    System.out.println("check map:"+map);	
		this.produceRequest("notificationservice", map);	
		return ResponseEntity.created(location).body(customerTicketReq);
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
	
	  @GetMapping ("customer/{Customer_id}")
	    public List<Customer> getAllTicket(@PathVariable Long  Customer_id) {
	    List<Customer> resp=service.findByCustomerId(Customer_id);
	    return resp;
	    }
	
	
	  @GetMapping ("/customer/{Customer_id}/ticket/{ticketid}")
	    public Optional<Customer> getuserTicket(@PathVariable String  Customer_id,@PathVariable Long  ticketid) {
		  System.out.println("check ticket id:"+ticketid+" "+Customer_id);
		  Optional<Customer> customer=service.findByUserticketId(ticketid);
		  System.out.println("check customer id:"+customer);
		    return customer;
	    }
	 
	  @GetMapping(path = "/login")
	  public ResponseEntity<Object> checkLogin(@RequestParam String username, @RequestParam Long passwd) {
	  System.out.println("username : "+username+" : passwd : "+passwd);
	  Map<String, String> map = new HashMap<>();
	  if(username.equalsIgnoreCase("ganesh") && passwd == 123) {
	  map.put("username", username);
	  map.put("passwd", passwd.toString());
	  map.put("accountNumber", "1");
	  map.put("msg", "Success");
	  return ResponseEntity.ok(map);
	  } else {
	  map.put("msg", "Fail");
	  return ResponseEntity.ok(map);
	  }
	  }


}
