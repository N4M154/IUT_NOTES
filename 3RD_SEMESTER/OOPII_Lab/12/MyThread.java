package threading.examplesOfCreating;

/**
 * Created by jubair.
 * Date: 15/11/23
 * Time: 10:02 PM
 */

class MyThread extends Thread {
    public void run() {
        System.out.println("This is a thread created by extending Thread class.");
    }
}