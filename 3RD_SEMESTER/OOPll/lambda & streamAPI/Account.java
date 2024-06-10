package other.streamAPIs;

/**
 * Created by jubair.
 * Date: 3/11/23
 * Time: 10:07 AM
 */

public class Account {
    String name;
    String bank;
    double balance;

    public Account(String name, String bank, double balance) {
        this.name = name;
        this.bank = bank;
        this.balance = balance;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "Account{" +
                "name='" + name + '\'' +
                ", bank='" + bank + '\'' +
                ", balance=" + balance +
                '}';
    }
}
