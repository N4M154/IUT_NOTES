public class Employee {
    private String firstName;
    private String lastName;
    private int age;
    private String postalCode;
    private String designation;
    private int remuneration;

    public Employee(String firstName, String lastName, int age, String postalCode, String designation, int remuneration) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.postalCode = postalCode;
        this.designation = designation;
        this.remuneration = remuneration;
    }

    public int getAge() {
        return age;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public int getRemuneration() {
        return remuneration;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public String getDesignation() {
        return designation;
    }
}