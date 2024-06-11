
@DevelopmentHistory(version = 1, developer = "XYZ",tester="MNO")
public class Course {
    private String courseCode;

    private String name;

    private int credit;

    private String type;


    @DevelopmentHistoryWithReviewer(version = 1, developer = "PQ",tester="RS",reviewers="TU")
    public Course(String courseCode, String name, int credit, String type) {
        this.courseCode = courseCode;
        this.name = name;
        this.credit = credit;
        this.type = type;
    }
}
