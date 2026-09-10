package com.example.library.service;

import com.example.library.component.BookValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired
    private BookValidator validator;

    public String addBook(String isbn) {

        if (validator.isValidISBN(isbn)) {
            return "Book Added Successfully";
        }

        return "Invalid ISBN";
    }
}