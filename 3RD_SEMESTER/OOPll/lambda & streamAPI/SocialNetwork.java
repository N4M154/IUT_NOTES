package other.lambda;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by jubair.
 * Date: 3/11/23
 * Time: 9:19 AM
 */

public class SocialNetwork {
    List<Person> friendList;

    public SocialNetwork(List<Person> friendList) {
        this.friendList = friendList;
    }

    public SocialNetwork() {
        this.friendList = new ArrayList<Person>(){{
            add(new Person(LocalDate.of(1968, 5, 17)));
                    add(new Person(LocalDate.of(1981, 5, 17)));
            add(new Person(LocalDate.of(1971, 5, 17)));
                            add(new Person(LocalDate.of(1991, 5, 17)));
        }};
    }

    public void sortFriendList(){
        Person[] friendsAsArray = friendList.toArray(new Person[friendList.size()]);
//        Arrays.sort(friendsAsArray, new PersonAgeComparator());
//
        Arrays.sort(friendsAsArray,
                (a, b) -> {
                    return a.getBirthday().compareTo(b.getBirthday());
                }
        );
//
        Arrays.sort(friendsAsArray,
                (a, b) -> Person.compareByAge(a, b)
        );

        Arrays.sort(friendsAsArray, Person::compareByAge);
        List<Person> sortList = Arrays.asList(friendsAsArray);
        sortList.forEach( p -> System.out.println(p));
    }

    public static void main(String[] args) {
        SocialNetwork socialNetwork = new SocialNetwork();
        socialNetwork.friendList.forEach( p -> {
            System.out.println(p);
            p.age += 3;
            System.out.println(p.age);
        });

        for (Person p:
                socialNetwork.friendList) {
            System.out.println(p);
        }

        System.out.println("\n\n");
        socialNetwork.sortFriendList();
//        socialNetwork.friendList.forEach( p -> System.out.println(p));
    }

}
