import java.util.Queue;
import java.util.Random;

public class Chef extends Thread{
    public static int nextID = 1;
    public int chefID;
    public Queue<String> orderQueue;
    public Queue<String> cookedFoodQueue;

    public Chef(Queue<String> orderQueue, Queue<String> cookedFoodQueue) {
        this.chefID = nextID++;
        this.orderQueue = orderQueue;
        this.cookedFoodQueue = cookedFoodQueue;
    }

    @Override
    public void run() {
        while (true) {
            synchronized (orderQueue) {
                if (!orderQueue.isEmpty()) {
                    String dish = orderQueue.poll();
                    if (dish != null) {
                        System.out.println("Chef " + chefID + " is preparing " + dish);
                        // Simulate cooking time
                        try {
                            Thread.sleep(new Random().nextInt(5000) + 1000); // Random cooking time between 1 to 5 seconds
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                        cookedFoodQueue.add(dish);
                    }
                }
            }
        }
    }
}
