package com.sbi.customer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sbi.customer.entity.Customer;
import com.sbi.customer.model.CustomerTicketReq;
import com.sbi.customer.repository.CustomerRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CustomerService {
	@Autowired
	private CustomerRepository repository;

	public Customer addCustomerTicket(CustomerTicketReq customerTicketreq) {
		Customer c1 = new Customer();
		c1.setCustomerId(customerTicketreq.getCustomerId());
		c1.setPhone(customerTicketreq.getPhone());
		c1.setMessage(customerTicketreq.getMessage());
		c1.setStatus(customerTicketreq.getStatus());
		c1.setEmailAddress(customerTicketreq.getEmailAddress());
		return (Customer) this.repository.save(c1);
	}
	
	
	public int updatecustomerStatus(Long id, String  status) {	
		return this.repository.updateCustomerTicket(id,status);
	}
	
	public List<Customer> findByCustomerId(Long CustomerId) {
		return repository.findAllByCustomerId(CustomerId);
	}
	
	public List<Customer> getAllCustomer() {
		return repository.findAll();
	}

	public Optional<Customer> findByUserticketId(Long id) {
		return repository.findById(id);
	}

}
