//2
import java.sql.*;
public class Task2
{
    public static void main(String args[])
    {
        String username = "random_username";
        String password = "random_password";
        String url = "jdbc:oracle:thin:@localhost:1521:xe";

        try
        {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(url, username, password);
            Statement statement = con.createStatement();

            PreparedStatement prepStatement = con.prepareStatement("insert into TRANSACTIONS values (? ,? ,? ,?, ?)");

            // Insert the first record
            prepStatement.setInt(1, 10006);
            prepStatement.setTimestamp(2, (Timestamp.valueOf("2022-02-12 00:00:00")));
            prepStatement.setInt(3, 2);
            prepStatement.setDouble(4, 5000);
            prepStatement.setString(5, String.valueOf('1'));
            prepStatement.executeUpdate();

            // Insert the second record
            prepStatement.setInt(1, 10007);
            prepStatement.setTimestamp(2, (Timestamp.valueOf("2022-10-15 00:00:00")));
            prepStatement.setInt(3, 4);
            prepStatement.setDouble(4, 10000);
            prepStatement.setString(5, String.valueOf('0'));
            prepStatement.executeUpdate();


        }

        catch(SQLException e)
        {
            System.out.println("Error while connecting to the database :"+e);
        }
        catch(ClassNotFoundException e)
        {
            System.out.println("Driver Not Found : " +e);
        }
    }
}