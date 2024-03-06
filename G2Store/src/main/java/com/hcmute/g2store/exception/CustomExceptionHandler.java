package com.hcmute.g2store.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object>handleAllException(Exception e){
        ErrorRes err = new ErrorRes(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        e.printStackTrace();
        return new ResponseEntity<>(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(CategoryException.class)
    public ResponseEntity<Object>handleCategoryNotFoundException(Exception e){
        ErrorRes err = new ErrorRes(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        e.printStackTrace();
        return new ResponseEntity<>(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(LoginException.class)
    public ResponseEntity<Object> handleLoginException(LoginException ex) {
        ErrorRes err = new ErrorRes(HttpStatus.BAD_REQUEST, ex.getMessage());
        ex.printStackTrace();
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }
}
