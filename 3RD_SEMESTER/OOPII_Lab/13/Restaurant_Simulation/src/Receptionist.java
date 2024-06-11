public class Receptionist {
    public int tablesAvailable;

    public Receptionist(int tables) {
        this.tablesAvailable = tables;
    }

    public synchronized void assignTable(Customer customer) {
        while (tablesAvailable == 0) {
            try {
                wait(); // Wait if no tables are available
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        tablesAvailable--;
        System.out.println("Customer " + customer.getCustomerID() + " is assigned a table.");
        notify(); // Notify chef/waiter a table is available
    }

    public synchronized void releaseTable() {
        tablesAvailable++;
        notify(); // Notify receptionist that a table is available
    }
}
