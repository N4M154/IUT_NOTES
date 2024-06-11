package threading.examplesOfCreating;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

/**
 * Created by jubair.
 * Date: 15/11/23
 * Time: 10:34 PM
 */

public class TimeZonePrinter implements Runnable{
    private String timeZone;
    private long startTime;

    public TimeZonePrinter(String timeZone) {
        this.timeZone = timeZone;
        this.startTime = System.currentTimeMillis();
    }

    public void run() {
        while ((System.currentTimeMillis() - startTime) <= 60000) { // Run for 60 seconds
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            sdf.setTimeZone(TimeZone.getTimeZone(timeZone));
            String formattedDate = sdf.format(date);
            System.out.println("Time in " + timeZone + ": " + formattedDate);

            try {
                Thread.sleep(2000); // Print time every 2 seconds
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted: " + e.getMessage());
            }
        }
    }
}
