//210042112

package com.example.test;

import com.example.main.OrderService;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import static org.junit.jupiter.api.Assertions.*;

public class OrderServiceParameterizedTest
{

    OrderService orderService = new OrderService();

    @ParameterizedTest
    @CsvSource({

            "100.0, 10.0, 90.0",
            "200.0, 25.0, 150.0",
            "50.0, 5.0, 47.5",  // fix : from 50.0 (given in the tasksheet) to 47.5

            //boundary cases
            "100.0, 0.0, 100.0",    // discount == null
            "100.0, 100.0, 0.0"     // discount == full
    })

    public void testApplyDiscount(double total, double discountPercent, double expected)
    {
        double result = orderService.applyDiscount(total, discountPercent);
        assertEquals(expected, result, 0.001, () -> "Expected was " + expected + " but actually got " + result + " for total=" + total + " and discount=" + discountPercent);
    }


}

// -_- N4M154 -_-