public class GradeCalculator {

    public static int computeSum(int[] marks) {
        int sum = 0;
        for (int mark : marks) {
            sum = sum + mark;
        }
        return sum;
    }

    public static double computeAverage(int[] marks) {
        int sum = computeSum(marks);
        double average = (double) sum / marks.length;
        return average;
    }

    public static String assignGrade(double average) {
        String grade;
        if (average >= 90) {
            grade = "A";
        } else if (average >= 75) {
            grade = "B";
        } else if (average >= 60) {
            grade = "C";
        } else {
            grade = "F";
        }
        return grade;
    }

    public static int findHighest(int[] marks) {
        int highest = marks[0];
        for (int mark : marks) {
            if (mark > highest) {
                highest = mark;
            }
        }
        return highest;
    }

    public static int findLowest(int[] marks) {
        int lowest = marks[0];
        for (int mark : marks) {
            if (mark < lowest) {
                lowest = mark;
            }
        }
        return lowest;
    }

    public static boolean hasPassed(double average) {
        return average >= 60;
    }
}