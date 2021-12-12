package com.account.service.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@RestControllerAdvice
public class AccountExceptionsController extends ResponseEntityExceptionHandler {

	@ExceptionHandler(value = Exception.class)
	public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
		AccountExceptionsHandler exceptionResponse = new AccountExceptionsHandler(
				ex.getMessage(), request.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<Object>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(value = AccountNotFoundException.class)
	public final ResponseEntity<Object> accountNotFoundException(AccountNotFoundException ex, WebRequest request) {
		AccountExceptionsHandler exceptionResponse = new AccountExceptionsHandler(
				ex.getMessage(), request.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<Object>(exceptionResponse, HttpStatus.NOT_FOUND);
	}

}
