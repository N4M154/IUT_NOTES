package other.lambda;

import java.time.LocalDate;
import java.time.Period;

/**
 * Created by jubair.
 * Date: 3/11/23
 * Time: 9:15 AM
 */

public class Person {
    String name;
    int age;
    LocalDate birthday;

    public Person(LocalDate birthday) {
        this.birthday = birthday;
        age = getAge();
    }

    public int getAge() {
        LocalDate currentday = LocalDate.now();
        return Period.between(birthday, currentday).getYears();
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public static int compareByAge(Person a, Person b) {
        return a.birthday.compareTo(b.birthday);
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", birthday=" + birthday.getYear() +
                '}';
    }
}
