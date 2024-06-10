import java.sql.*;

public class InsertJohnDoe {
    public static void main(String[] args) {
        String Username = "namisa";
        String Password = "123456";
        String URL = "jdbc:oracle:thin:@localhost:1521:xe";

        String dept_name_query = "SELECT dept_name " +
                "FROM (" +
                "    SELECT dept_name, ROW_NUMBER() OVER (ORDER BY COUNT(*) ASC) as rnk " +
                "    FROM namisa.student " +
                "    GROUP BY dept_name " +
                ") " +
                "WHERE rnk = 1";

        String highest_ID_query = "SELECT MAX(ID) FROM student";

        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection connection = DriverManager.getConnection(URL, Username, Password);
            Statement stmt = connection.createStatement();

            // Get the highest ID
            ResultSet rsHighestID = stmt.executeQuery(highest_ID_query);
            int highestID = 0;
            while (rsHighestID.next()) {
                highestID = rsHighestID.getInt(1);
            }
            highestID++;


            ResultSet rsDeptName = stmt.executeQuery(dept_name_query);
            String deptName = null;
            if (rsDeptName.next()) {
                deptName = rsDeptName.getString(1);
            }


            if (deptName != null && !deptName.isEmpty()) {
                
                String insertQuery = "INSERT INTO namisa.student VALUES (" + highestID + ", 'John Doe', '" + deptName + "', 3.6)";
                int result = stmt.executeUpdate(insertQuery);
                if (result > 0) {
                    System.out.println("Query Executed Successfully");
                } else {
                    System.out.println("Query Failed");
                }
            } else {
                System.out.println("Department name is null or empty. Cannot insert student record.");
            }

            connection.close();
        } catch (ClassNotFoundException e) {
            System.out.println("Driver Not Found: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("Connection Failed: " + e.getMessage());
        }
    }
}
