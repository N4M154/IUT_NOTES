//210042112

package com.example.main;

public class CheckoutService
{
    private final PaymentProcessor processor;

    public CheckoutService(PaymentProcessor processor) {
        this.processor = processor;
    }

    public String checkout(String userId, double totalAmount) {
        return processor.processPayment(userId, totalAmount);
    }
}

// -_- N4M154 -_-