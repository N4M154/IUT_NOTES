package com.example.library.controller;

import com.example.library.service.BookService;
import com.example.library.service.BorrowService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/library")
public class LibraryController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BorrowService borrowService;

    @GetMapping("/add")
    public String addBook() {

        return bookService.addBook("1234567890123");
    }

    @GetMapping("/borrow")
    public String borrowBook() {

        return borrowService.borrowBook("1234567890123");
    }

}