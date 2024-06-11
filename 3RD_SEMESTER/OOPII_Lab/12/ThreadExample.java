package threading.examplesOfCreating;

/**
 * Created by jubair.
 * Date: 15/11/23
 * Time: 10:12 PM
 */

public class ThreadExample extends Thread{
    private int count;

    public ThreadExample(int count) {
        this.count = count;
    }

    public void run() {
        for (int i = 1; i <= count; i++) {
            System.out.println("Thread: " + Thread.currentThread().getName() + ", Count: " + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted: " + e.getMessage());
            }
        }
    }
}
