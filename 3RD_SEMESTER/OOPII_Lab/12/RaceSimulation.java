package threading.examplesOfCreating;

/**
 * Created by jubair.
 * Date: 15/11/23
 * Time: 10:20 PM
 */

public class RaceSimulation {
    public static void main(String[] args) {
        int numberOfRacer = 4;
        Thread[] racers = new Thread[numberOfRacer];

        for (int i = 0; i < numberOfRacer; i++) {
            racers[i] = new Thread(new Racer("Racer " + (i + 1)));
            racers[i].start();
        }

        // Ensure all threads finish before exiting
//        for (Thread racer : racers) {
//            try {
//                racer.join();
//            } catch (InterruptedException e) {
//                System.out.println("Race interrupted: " + e.getMessage());
//            }
//        }

    }
}
