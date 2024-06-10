import java.sql.*;

public class DecreaseBudget {
    public static void main(String[] args) {
        String newUsername = "namisa";
        String newPassword = "123456";
        String newURL = "jdbc:oracle:thin:@localhost:1521:xe";

        String newQueryUpdate = "UPDATE department SET budget = budget * 0.9 WHERE budget > 99999";
        String newQueryCountUnaffected = "SELECT COUNT(*) FROM department WHERE budget <= 99999";

        int newUnaffectedCount = 0;

        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection newConnection = DriverManager.getConnection(newURL, newUsername, newPassword);
            Statement newStmt = newConnection.createStatement();

            int newRowsUpdated = newStmt.executeUpdate(newQueryUpdate);
            System.out.println("Budgets decreased for " + newRowsUpdated + " departments.");

            ResultSet newRs = newStmt.executeQuery(newQueryCountUnaffected);
            if (newRs.next()) {
                newUnaffectedCount = newRs.getInt(1);
            }

            System.out.println("Number of departments unaffected: " + newUnaffectedCount);

            newConnection.close();
        } catch (ClassNotFoundException e) {
            System.out.println("Driver Not Found: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("Connection Failed: " + e.getMessage());
        }
    }
}


