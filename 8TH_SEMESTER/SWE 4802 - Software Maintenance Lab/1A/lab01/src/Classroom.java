import java.util.ArrayList;

public class Classroom {

    private String className;
    private ArrayList<Student> students;

    public Classroom(String className) {
        this.className = className;
        this.students = new ArrayList<>();
    }

    public void addStudent(Student student) {
        students.add(student);
    }

    public Student findStudentById(int id) {
        for (Student student : students) {
            if (student.getId() == id) {
                return student;
            }
        }
        return null;
    }

    public double getClassAverage() {
        double total = 0;
        for (Student student : students) {
            double avg = GradeCalculator.computeAverage(student.getMarks());
            total = total + avg;
        }
        return total / students.size();
    }

    public void printTopStudent() {
        Student top = null;
        double topAvg = -1;

        for (Student student : students) {
            double avg = GradeCalculator.computeAverage(student.getMarks());
            if (avg > topAvg) {
                topAvg = avg;
                top = student;
            }
        }

        if (top != null) {
            System.out.println("Top Student: " + top.getName() + " | Average: " + topAvg);
        }
    }

    public void printAllResults() {
        System.out.println("=== Results for " + className + " ===");
        for (Student student : students) {
            double avg = GradeCalculator.computeAverage(student.getMarks());
            String grade = GradeCalculator.assignGrade(avg);
            boolean passed = GradeCalculator.hasPassed(avg);

            System.out.println("Name: " + student.getName()
                    + " | Avg: " + avg
                    + " | Grade: " + grade
                    + " | Passed: " + passed);
        }
    }

    public String getClassName() {
        return className;
    }

    public ArrayList<Student> getStudents() {
        return students;
    }
}