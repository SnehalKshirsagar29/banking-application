package com.example.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import com.example.demo.entity.LoanEntity;
import com.example.demo.repos.LoanRepository;

@SpringBootApplication
@EnableDiscoveryClient
public class LoanServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoanServiceApplication.class, args);
	}

//	@Bean
//	public CommandLineRunner runner() {
//			
//			return new CommandLineRunner() {
//				
//				@Autowired
//				LoanRepository repos;
//					
//				@Override
//				public void run(String... args) throws Exception{
//				repos.save(new LoanEntity(Long.valueOf("1"), "1", Double.valueOf("500000"), Double.valueOf("400000"), Integer.valueOf("60"), Integer.valueOf("40"), "NEW", Integer.valueOf("900")));
//				}
//			};
//		}
}
