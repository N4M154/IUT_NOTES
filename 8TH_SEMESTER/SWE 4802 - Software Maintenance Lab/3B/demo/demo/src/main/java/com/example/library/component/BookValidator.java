package com.example.library.component;

import org.springframework.stereotype.Component;

@Component
public class BookValidator {

    public BookValidator() {
        System.out.println("BookValidator Bean Created");
    }

    public boolean isValidISBN(String isbn) {

        return isbn != null &&
                isbn.length() == 13;
    }
}