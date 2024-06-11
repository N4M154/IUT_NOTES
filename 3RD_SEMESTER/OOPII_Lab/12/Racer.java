package threading.examplesOfCreating;

import java.util.Random;

/**
 * Created by jubair.
 * Date: 15/11/23
 * Time: 10:18 PM
 */

public class Racer implements Runnable {
    private static String winner;
    private String name;

    public Racer(String name) {
        this.name = name;
    }

//    @Override
//    public void run() {
//        for (int distance = 1; distance <= 100; distance++) {
//            System.out.println(name + " has covered " + distance + " meters.");
//
//            if (distance == 100 && winner == null) {
//                winner = name;
//                System.out.println("We have a winner: " + winner);
//                break;
//            }
//
//            try {
//                Thread.sleep(100);
//            } catch (InterruptedException e) {
//                System.out.println(name + " was interrupted.");
//            }
//        }
//    }

    private static final Random random = new Random();

    @Override
    public void run() {
        for (int distance = 1; distance <= 100;) {
            System.out.println(name + " has covered " + distance + " meters.");


            int increment = random.nextInt(5) + 1;
            distance += increment;

            // Check if a racer has finished the race
            if (distance >= 100 && winner == null) {
                winner = name;
                System.out.println("We have a winner: " + winner);
                break;
            }

            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                System.out.println(name + " was interrupted.");
            }
        }
    }
}
