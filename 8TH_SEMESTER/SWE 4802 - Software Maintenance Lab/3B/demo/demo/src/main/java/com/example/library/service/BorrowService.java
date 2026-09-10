package com.example.library.service;

import com.example.library.component.BookValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BorrowService {

    @Autowired
    private BookValidator validator;

    public String borrowBook(String isbn) {

        if (validator.isValidISBN(isbn)) {
            return "Book Borrowed Successfully";
        }

        return "Invalid ISBN";
    }
}