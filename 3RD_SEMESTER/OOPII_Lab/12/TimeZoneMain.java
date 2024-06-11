package threading.examplesOfCreating;



public class TimeZoneMain {
    public static void main(String[] args) {
        Thread thread1 = new Thread(new TimeZonePrinter("GMT"));
        Thread thread2 = new Thread(new TimeZonePrinter("BST"));
        Thread thread3 = new Thread(new TimeZonePrinter("Asia/Tokyo"));

        thread1.start();
        thread2.start();
        thread3.start();
    }
}
