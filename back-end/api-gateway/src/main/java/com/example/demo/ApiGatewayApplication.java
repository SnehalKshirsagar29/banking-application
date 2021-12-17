package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
//@CrossOrigin(origins = "http://localhost:8080")
public class ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

	/*
	 * @GetMapping(path = "/default") public String message() { return
	 * "Default Message"; }
	 * 
	 * @Bean public WebClient.Builder builRef(){
	 * 
	 * return WebClient.builder(); }
	 * 
	 * 
	 * 
	 * @Bean public WebClient restClient( WebClient.Builder builRef) {
	 * 
	 * return builRef.build(); }
	 * 
	 * /*@Bean public RouteLocator myRoutes(RouteLocatorBuilder routeBuilder) {
	 * 
	 * return routeBuilder.routes(). route(p->p .path("/api")
	 * .filters(f->f.circuitBreaker(c->c.setName("custom").setFallbackUri(
	 * "/default") )) .uri("http://localhost:3038")) .build(); }
	 * 
	 * @Bean public Customizer<ReactiveResilience4JCircuitBreakerFactory>
	 * defaultCustomizer(){
	 * 
	 * return factory -> factory.configureDefault(id -> new
	 * Resilience4JConfigBuilder(id)
	 * .circuitBreakerConfig(CircuitBreakerConfig.ofDefaults())
	 * .timeLimiterConfig(TimeLimiterConfig.custom()
	 * .timeoutDuration(Duration.ofSeconds(20)).build()).build()); }
	 */
}
