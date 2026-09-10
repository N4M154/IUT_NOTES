
public class Student {

    private String name;
    private int id;
    private int[] marks;

    public Student(String name, int id, int[] marks) {
        this.name = name;
        this.id = id;
        this.marks = marks;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public int[] getMarks() {
        return marks;
    }

    public void setMarks(int[] marks) {
        this.marks = marks;
    }

    public void printInfo() {
        System.out.println("ID: " + id + " | Name: " + name);
    }
}