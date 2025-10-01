//210042112

package com.example.test;

import com.example.main.CheckoutService;
import com.example.main.PaymentProcessor;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class CheckoutServiceTest {
    @Test
    public void CheckoutSuccessAndVerificationTest()
    {

        PaymentProcessor mockProcessor = mock(PaymentProcessor.class);


        when(mockProcessor.processPayment(anyString(), anyDouble())).thenReturn("SUCCESS");


        CheckoutService checkoutService = new CheckoutService(mockProcessor);


        String result = checkoutService.checkout("user112", 512.0);


        assertEquals("SUCCESS", result, "Expected payment result to be SUCCESS");


        verify(mockProcessor, times(1)).processPayment("user112", 512.0);
    }
}

// -_- N4M154 -_-