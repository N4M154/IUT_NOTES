import java.util.Queue;
import java.util.Random;

public class Customer extends Thread{
    public static int nextID = 1;
    public int customerID;
    public Queue<String> orderQueue;
    public Receptionist receptionist;
    public static int customersServedCount = 0;

    public int customersServed;

    public Customer(Receptionist receptionist, Queue<String> orderQueue,int customersServed) {
        this.customerID = nextID++;
        this.orderQueue = orderQueue;
        this.receptionist = receptionist;
        this.customersServed = customersServed;
    }

    @Override
    public void run() {
        System.out.println("Customer " + customerID + " is in the restaurant.");
        receptionist.assignTable(this);

        synchronized (Customer.class) {
            customersServedCount++;
            System.out.println("Customer " + customerID + " is getting served.");
            if (customersServedCount >= customersServed) {
                // Stop ordering once N customers are served
                receptionist.releaseTable();
                return;
            }
        }

        // Simulate placing order
        Random rand = new Random();
        int orderCount = rand.nextInt(3) + 1; // Randomly order 1 to 3 dishes
        for (int i = 0; i < orderCount; i++) {
            String dish = getRandomDish();
            System.out.println("Customer " + customerID + " is ordering " + dish);
            orderQueue.add(dish);
        }

        // Wait for food to be served
        while (!orderQueue.isEmpty()) {
            // Waiting for the dish to be served
        }

        System.out.println("Customer " + customerID + " finished dining.");
    }

    public String getRandomDish() {
        String[] dishes = {"Burger", "Pizza", "Pasta"};
        Random rand = new Random();
        return dishes[rand.nextInt(dishes.length)];
    }

    public int getCustomerID() {
        return customerID;
    }
}
