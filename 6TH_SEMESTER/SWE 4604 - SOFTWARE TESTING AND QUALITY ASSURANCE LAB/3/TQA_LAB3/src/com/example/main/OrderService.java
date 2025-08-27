//210042112

package com.example.main;

import java.util.List;

public class OrderService
{
    public boolean validateCart(List<String> items) {
        return !items.isEmpty();
    }

    public double applyDiscount(double total, double discountPercent) {
        return total - (total * discountPercent / 100);
    }

    public double calculateTotal(List<Double> itemPrices) {
        return itemPrices.stream().mapToDouble(Double::doubleValue).sum();
    }
}

// -_- N4M154 -_-