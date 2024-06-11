import java.util.List;

@DevelopmentHistory(version = 1, developer = "AB", tester = "CD")
public class Faculty {


    private String name;


    private String designation;


    private double salary;

    private List<Course> courses;

    @DevelopmentHistoryWithReviewer(version = 1, developer = "EF", tester = "GH", reviewers={"rev 1","rev 2"})
    public Faculty(String name, String designation, double salary, List<Course> courses)
    {
        this.name = name;
        this.designation = designation;
        this.salary = salary;
        this.courses = courses;
    }

    @DevelopmentHistoryWithReviewer(version = 1, developer = "IJ", tester = "KL", reviewers={"rev 3","rev 4"})
    public Faculty(String name, String designation, double salary)
    {
        this.name = name;
        this.designation = designation;
        this.salary = salary;
    }

    @DevelopmentHistoryWithReviewer(version = 1, developer = "MN", tester = "OP", reviewers={"rev 5","rev 6"})
    public void teach( Course course)
    {
        System.out.println();
    }


    @DevelopmentHistoryWithReviewer(version = 1, developer = "QR", tester = "ST", reviewers={"rev 7","rev 8"})
    public void research( String topic)
    {
        System.out.println();
    }
}


