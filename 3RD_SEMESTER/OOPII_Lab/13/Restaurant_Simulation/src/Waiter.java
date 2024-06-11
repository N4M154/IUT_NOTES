import java.util.Queue;
import java.util.Random;

public class Waiter extends Thread{
    public static int nextID = 1;
    public int waiterID;
    public Queue<String> cookedFoodQueue;

    public Waiter(Queue<String> cookedFoodQueue) {
        this.waiterID = nextID++;
        this.cookedFoodQueue = cookedFoodQueue;
    }

    @Override
    public void run() {
        while (true) {
            synchronized (cookedFoodQueue) {
                if (!cookedFoodQueue.isEmpty()) {
                    String dish = cookedFoodQueue.poll();
                    if (dish != null) {
                        System.out.println("Waiter " + waiterID + " is serving " + dish);
                        // Simulate serving time
                        try {
                            Thread.sleep(new Random().nextInt(3000) + 1000); // Random serving time between 1 to 4 seconds
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
    }
}
