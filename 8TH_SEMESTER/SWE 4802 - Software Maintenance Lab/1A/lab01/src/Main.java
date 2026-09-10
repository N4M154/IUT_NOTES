public class Main {

    public static void main(String[] args) {

        // --- Create Students ---
        Student s1 = new Student("Alice",  101, new int[]{85, 92, 78, 90, 88});
        Student s2 = new Student("Bob",    102, new int[]{55, 60, 58, 62, 50});
        Student s3 = new Student("Carol",  103, new int[]{95, 98, 100, 97, 99});
        Student s4 = new Student("David",  104, new int[]{40, 35, 50, 45, 38});

        // --- Build Classroom ---
        Classroom classroom = new Classroom("Software Testing 101");
        classroom.addStudent(s1);
        classroom.addStudent(s2);
        classroom.addStudent(s3);
        classroom.addStudent(s4);

        // --- Print All Results ---
        classroom.printAllResults();

        System.out.println();

        // --- Class Average ---
        double classAvg = classroom.getClassAverage();
        System.out.println("Class Average: " + classAvg);

        System.out.println();

        // --- Top Student ---
        classroom.printTopStudent();

        System.out.println();

        // --- Look up a specific student by ID ---
        Student found = classroom.findStudentById(102);
        if (found != null) {
            double avg     = GradeCalculator.computeAverage(found.getMarks());
            int highest    = GradeCalculator.findHighest(found.getMarks());
            int lowest     = GradeCalculator.findLowest(found.getMarks());
            int sum        = GradeCalculator.computeSum(found.getMarks());
            String grade   = GradeCalculator.assignGrade(avg);
            boolean passed = GradeCalculator.hasPassed(avg);

            System.out.println("--- Student Lookup ---");
            found.printInfo();
            System.out.println("Sum     : " + sum);
            System.out.println("Average : " + avg);
            System.out.println("Highest : " + highest);
            System.out.println("Lowest  : " + lowest);
            System.out.println("Grade   : " + grade);
            System.out.println("Passed  : " + passed);
        }
    }
}