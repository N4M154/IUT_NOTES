import java.sql.*;
import java.util.Scanner;

public class TimeSlot {
    public static void main(String[] args) {
        try {
            // Database connection details
            String newUsername = "namisa";
            String newPassword = "123456";
            String newURL = "jdbc:oracle:thin:@localhost:1521:xe";

            // JDBC driver registration
            Class.forName("oracle.jdbc.driver.OracleDriver");

            // Establishing the connection
            Connection newConnection = DriverManager.getConnection(newURL, newUsername, newPassword);

            // Taking user input
            Scanner newScanner = new Scanner(System.in);
            System.out.println("Enter the day of the week:");
            String newDay = newScanner.nextLine();
            System.out.println("Enter the starting hour:");
            int newStartHour = newScanner.nextInt();
            System.out.println("Enter the ending hour:");
            int newEndHour = newScanner.nextInt();

            // SQL query to retrieve names of instructors
            String newSqlQuery = "SELECT i.name " +
                    "FROM instructor i, teaches t, section s, time_slot ts " +
                    "WHERE i.ID = t.ID AND " +
                    "t.course_id = s.course_id AND t.sec_id = s.sec_id AND t.semester = s.semester AND t.year = s.year AND " +
                    "s.time_slot_id = ts.time_slot_id AND ts.day = ? AND ts.start_hr >= ? AND ts.end_hr <= ?";

            // Creating a PreparedStatement
            PreparedStatement newPstmt = newConnection.prepareStatement(newSqlQuery);
            newPstmt.setString(1, newDay);
            newPstmt.setInt(2, newStartHour);
            newPstmt.setInt(3, newEndHour);

            // Executing the query
            ResultSet newRs = newPstmt.executeQuery();

            // Displaying the results
            System.out.println("Instructors taking classes during that time:");
            while (newRs.next()) {
                System.out.println(newRs.getString("name"));
            }

            // Closing resources
            newPstmt.close();
            newRs.close();
            newConnection.close();
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
}


