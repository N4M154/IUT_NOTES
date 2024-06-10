package other.lambda;

import java.util.Comparator;

/**
 * Created by jubair.
 * Date: 3/11/23
 * Time: 9:29 AM
 */

public class PersonAgeComparator implements Comparator<Person> {
    public int compare(Person a, Person b) {
        return a.getBirthday().compareTo(b.getBirthday());
    }
}
