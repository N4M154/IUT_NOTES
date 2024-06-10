package other.streamAPIs;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by jubair.
 * Date: 3/11/23
 * Time: 10:08 AM
 */

public class Application {
    List<Account> accountList;

    public Application(List<Account> accountList) {
        this.accountList = accountList;
    }

    public Application() {
        accountList = new ArrayList<>();

        accountList.add(new Account("Alif", "AB", 1000));
        accountList.add(new Account("Ovi", "DB", 4300));
        accountList.add(new Account("Navi", "BB", 1500));
        accountList.add(new Account("Himel", "JB", 15000));
    }

    public static void main(String[] args) {
        Application application = new Application();
        List<Account> highBalancedAccounts = application.accountList.stream().filter(a -> a.balance > 1000).collect(Collectors.toList());
        System.out.println(highBalancedAccounts.stream().count());
        System.out.println(highBalancedAccounts.stream().min(Comparator.comparing(Account::getBalance)));


        highBalancedAccounts.forEach(a -> System.out.println(a.toString()));



        List<String> mappedAccountNames = application.accountList.stream().map(a -> a.name).collect(Collectors.toList());
        mappedAccountNames.forEach(s -> System.out.println(s));

        List<Account> mappedAccounts = application.accountList.stream().map(a -> new Account(a.name, a.bank, a.balance*2)).collect(Collectors.toList());
        mappedAccounts.forEach(a -> System.out.println(a.toString()));

    }

}
