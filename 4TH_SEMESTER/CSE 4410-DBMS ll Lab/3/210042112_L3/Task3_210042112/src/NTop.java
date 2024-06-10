import java.sql.*;
import java.util.Scanner;

public class NTop {
    public static void main(String[] args) {
        Scanner newScanner = new Scanner(System.in);
        System.out.println("Enter the Number of Students: ");
        int newN = newScanner.nextInt();

        String newQuery = "SELECT ID, name, dept_name, num_courses_taken " +
                "FROM (SELECT s.ID, s.name, s.dept_name, COUNT(t.course_id) as num_courses_taken " +
                "FROM student s " +
                "LEFT JOIN takes t ON s.ID = t.ID " +
                "GROUP BY s.ID, s.name, s.dept_name " +
                "ORDER BY num_courses_taken DESC) " +
                "WHERE ROWNUM <= ?";

        String newUsername = "namisa";
        String newPassword = "123456";
        String newURL = "jdbc:oracle:thin:@localhost:1521:xe";

        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection newConnection = DriverManager.getConnection(newURL, newUsername, newPassword);
            PreparedStatement newPstmt = newConnection.prepareStatement(newQuery);
            newPstmt.setInt(1, newN);
            ResultSet newRs = newPstmt.executeQuery();

            while (newRs.next()) {
                System.out.println(newRs.getString("ID") + " " +
                        newRs.getString("name") + " " +
                        newRs.getString("dept_name") + " " +
                        newRs.getString("num_courses_taken"));
            }


            newRs.close();
            newPstmt.close();
            newConnection.close();
        } catch (ClassNotFoundException e) {
            System.out.println("Driver Not Found: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("Connection Failed: " + e.getMessage());
        }
    }
}


