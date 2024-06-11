package threading.examplesOfCreating;

/**
 * Created by jubair.
 * Date: 15/11/23
 * Time: 10:08 PM
 */

public class ThreadUsingRunnable implements Runnable{
    public void run() {
        System.out.println("This is a thread created by implementing Runnable interface.");
    }
}
