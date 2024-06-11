import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class RestaurantSimulation {
    public static void main(String[] args) {
        int tables = 3; // Number of tables in the restaurant
        int chefs = 1; // Number of chefs
        int waiters = 2; // Number of waiters
        int totalCustomers = 4; // Total number of customers in the restaurant
        int customersServed = 2; // Number of customers to be served before simulation stops


        Queue<String> orderQueue = new LinkedList<>();
        Queue<String> cookedFoodQueue = new LinkedList<>();
        Receptionist receptionist = new Receptionist(tables);

        List<Customer> customers = new ArrayList<>();
        for (int i = 0; i < totalCustomers; i++) {
            customers.add(new Customer(receptionist, orderQueue, customersServed));
        }

        List<Chef> chefList = new ArrayList<>();
        for (int i = 0; i < chefs; i++) {
            chefList.add(new Chef(orderQueue, cookedFoodQueue));
        }

        List<Waiter> waiterList = new ArrayList<>();
        for (int i = 0; i < waiters; i++) {
            waiterList.add(new Waiter(cookedFoodQueue));
        }

        // Start all threads
        for (Customer customer : customers) {
            customer.start();
        }

        for (Chef chef : chefList) {
            chef.start();
        }

        for (Waiter waiter : waiterList) {
            waiter.start();
        }

        // Wait for all customers to finish dining
        for (Customer customer : customers) {
            try {
                customer.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }



        System.out.println("Simulation complete. All threads finished.");
    }
}