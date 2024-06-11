package threading.examplesOfCreating;

/**
 * Created by jubair.
 * Date: 15/11/23
 * Time: 10:03 PM
 */

public class ThreadCreator {
    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start();
//        thread.stop();

        ThreadUsingRunnable threadUsingRunnable = new ThreadUsingRunnable();
        Thread runnableThread = new Thread(threadUsingRunnable);
        runnableThread.start();

        Runnable runnable = () -> {
            System.out.println("This is a thread created using a lambda expression.");
        };

        Thread lambdaThread = new Thread(runnable);
        lambdaThread.start();

        ThreadExample threadExample = new ThreadExample(3);
        threadExample.start();

        int count = 3;
        Runnable task = () -> {
            for (int i = 1; i <= count; i++) {
                System.out.println("Thread: " + Thread.currentThread().getName() + ", Count: " + i);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    System.out.println("Thread interrupted: " + e.getMessage());
                }
            }
        };

        lambdaThread = new Thread(task);
        lambdaThread.start();
    }
}
