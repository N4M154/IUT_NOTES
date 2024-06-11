package threading.examplesOfCreating;

/**
 * Created by jubair.
 * Date: 15/11/23
 * Time: 11:34 PM
 */

public class PriorityMain {
    public static void main(String[] args) {
        Thread thread1 = new Thread(new PriorityExample("Low Priority"));
        Thread thread2 = new Thread(new PriorityExample("Norm Priority"));
        Thread thread3 = new Thread(new PriorityExample("High Priority"));

        thread1.setPriority(Thread.MIN_PRIORITY); // Lowest priority 1
        thread2.setPriority(Thread.NORM_PRIORITY); // Normal priority 5
        thread3.setPriority(Thread.MAX_PRIORITY); // Highest priority 10

//        thread1.start();
//        thread2.start();
//        thread3.start();


        Thread thread11 = new Thread(() -> {
//            String threadName = Thread.currentThread().getName();
            System.out.println("Thread 1");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        Thread thread22 = new Thread(() -> {
            try {
                thread11.join(); // Wait for thread 1 to finish
                System.out.println("Thread 2 speaking");
                // Task for thread 2 (executes after thread 1 finishes)
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted: " + e.getMessage());
            }
        });

        thread11.start();
        thread22.start();
    }
}
