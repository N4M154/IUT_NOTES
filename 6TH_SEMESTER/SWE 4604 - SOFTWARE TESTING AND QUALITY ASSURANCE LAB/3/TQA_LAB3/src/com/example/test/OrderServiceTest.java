//210042112


package com.example.test;

import com.example.main.OrderService;
import org.junit.jupiter.api.*;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class OrderServiceTest
{

    OrderService orderService = new OrderService();

    @Test
    @Order(1)
    public void test_1_validateCart() {
        System.out.println("Validating cart(1st test case)");
        List<String> items = Arrays.asList("1st item", "2nd item");
        assertTrue(orderService.validateCart(items), "Cart should be valid");
    }

    @Test
    @Order(2)
    public void test_2_applyDiscount() {
        System.out.println("Applying discount(2nd test case)");
        double discounted = orderService.applyDiscount(112.0, 12.0);
        assertEquals(98.56, discounted, 0.001);
    }

    @Test
    @Order(3)
    public void test_3_calculateTotalAfterDiscount() {
        System.out.println("Calculating total(3rd test case)");
        List<Double> prices = Arrays.asList(12.0, 112.0, 1112.0);
        double total = orderService.calculateTotal(prices);
        assertEquals(1236.0, total, 0.001);
    }
}


// -_- N4M154 -_-