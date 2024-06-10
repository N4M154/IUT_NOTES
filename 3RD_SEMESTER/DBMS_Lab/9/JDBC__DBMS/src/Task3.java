//3
import java.sql.*;
public class Task3
{
    public static void main(String args[])
    {
        String username = "random_username";
        String password = "random_password";
        String url = "jdbc:oracle:thin:@localhost:1521:xe";

        String Query1 = "SELECT * FROM ACCOUNT";
        String Query2 = "SELECT * FROM TRANSACTIONS";


        try
        {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(url, username, password);


            Statement statement = con.createStatement();

            //ACCOUNT table
            ResultSet rs1 = statement.executeQuery(Query1);
            ResultSetMetaData rsmd1 = rs1. getMetaData();
            System.out.println("\nTotal columns for ACCOUNT table: " + rsmd1.getColumnCount() + "\n");
            System.out.println("(Column Name) - (Data Type)");
            for ( int i = 1; i <= rsmd1.getColumnCount() ; i ++)
            {

                System.out.println(rsmd1.getColumnName(i) + " - " + rsmd1.getColumnTypeName(i) + "\n") ;
            }
            rs1.close();

            //TRANSACTIONS table
            ResultSet rs2 = statement.executeQuery(Query2);
            ResultSetMetaData rsmd2 = rs2. getMetaData();
            System.out.println("Total columns for TRANSACTIONS table: "+rsmd2.getColumnCount() + "\n");
            System.out.println("(Column Name) - (Data Type)");
            for ( int i = 1; i <= rsmd2.getColumnCount() ; i ++)
            {

                System.out.println(rsmd2.getColumnName(i) + " - " + rsmd2.getColumnTypeName(i)) ;
            }
        }


        catch (SQLException e)
        {
            System.out.println("Error while connecting to the database :"+e);
        }
        catch (ClassNotFoundException e)
        {
            System.out.println("Driver Not Found : " +e);
        }
    }
}
