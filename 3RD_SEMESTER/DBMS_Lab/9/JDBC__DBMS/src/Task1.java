
//1
import java.sql.*;
public class Task1
{
    public static void main(String[] args)
    {
        String username = "random_username";//oracle username
        String password = "random_password";//oracle password
        String url = "jdbc:oracle:thin:@localhost:1521:xe";

        //total number of accounts.It was said to fetch the data from TRANSACTIONS table.
        String q1 = "SELECT COUNT(DISTINCT A_ID) from TRANSACTIONS";

        //CIP numbers
        String q2 = "SELECT COUNT(*) AS CIP_Count\n" +
                "FROM (\n" +
                "SELECT A.A_ID\n" +
                "FROM ACCOUNT A\n" +
                "INNER JOIN (\n" +
                "SELECT A_ID,\n" +
                "SUM(CASE WHEN TYPE = '0' THEN AMOUNT ELSE 0 END) -\n" +
                "SUM(CASE WHEN TYPE = '1' THEN AMOUNT ELSE 0 END) AS Total_Balance,\n" +
                "SUM(AMOUNT) AS Total_Amount_of_Transactions\n" +
                "FROM TRANSACTIONS\n" +
                "GROUP BY A_ID\n" +
                ") T ON A.A_ID = T.A_ID\n" +
                "WHERE Total_Amount_of_Transactions > 5000000\n" +
                "AND Total_Balance > 1000000\n" +
                ")\n";



        //VIP number
        String q3 = "SELECT COUNT(*) AS VIP_Count\n" +
                "FROM (\n" +
                "SELECT A.A_ID\n" +
                "FROM ACCOUNT A\n" +
                "INNER JOIN (\n" +
                "SELECT A_ID,\n" +
                "SUM(CASE WHEN TYPE = '0' THEN AMOUNT ELSE 0 END) -\n" +
                "SUM(CASE WHEN TYPE = '1' THEN AMOUNT ELSE 0 END) AS Total_Balance,\n" +
                "SUM(AMOUNT) AS Total_Amount_of_Transactions\n" +
                "FROM TRANSACTIONS\n" +
                "GROUP BY A_ID\n" +
                ") T ON A.A_ID = T.A_ID\n" +
                "WHERE Total_Balance > 500000 AND Total_Balance < 900000\n" +
                "AND Total_Amount_of_Transactions > 2500000 AND Total_Amount_of_Transactions < 4500000\n" +
                ")\n";


        //ordinary person number
        String q4 = "SELECT COUNT(*) AS OP_Count\n" +
                "FROM (\n" +
                "SELECT A.A_ID\n" +
                "FROM ACCOUNT A\n" +
                "INNER JOIN (\n" +
                "SELECT A_ID,\n" +
                "SUM(CASE WHEN TYPE = '0' THEN AMOUNT ELSE 0 END) -\n" +
                "SUM(CASE WHEN TYPE = '1' THEN AMOUNT ELSE 0 END) AS Total_Balance,\n" +
                "SUM(AMOUNT) AS Total_Amount_of_Transactions\n" +
                "FROM TRANSACTIONS\n" +
                "GROUP BY A_ID\n" +
                ") T ON A.A_ID = T.A_ID\n" +
                "WHERE Total_Amount_of_Transactions <= 1000000\n" +
                "AND Total_Balance <= 1000000\n" +
                ")\n";

        int Total_Accounts=0;
        int CIP = 0;
        int VIP = 0;
        int Ordinary = 0;
        int Uncategorized = 0;

        try
        {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection con = DriverManager.getConnection(url, username, password);
            Statement statement = con.createStatement();

            //For the Total Account Number
            ResultSet result1 = statement.executeQuery(q1);
            while (result1.next())
            {
                Total_Accounts = result1.getInt(1);
                System.out.println("Total Number of Accounts : " + Total_Accounts);
            }
            result1.close();

            //For the CIP count
            ResultSet result2 = statement.executeQuery(q2);
            while (result2.next())
            {
                CIP = result2.getInt(1);
                System.out.println("CIP count : " + CIP);
            }
            result2.close();

            //For the VIP count
            ResultSet result3 = statement.executeQuery(q3);
            while (result3.next())
            {
                VIP = result3.getInt(1);
                System.out.println("VIP count : " + VIP);
            }
            result3.close();

            //For the Ordinary people count
            ResultSet result4 = statement.executeQuery(q4);
            while (result4.next())
            {
                Ordinary = result4.getInt(1);
                System.out.println("Ordinary count : " + Ordinary);
            }
            result4.close();

            //The remaining are uncategorized
            Uncategorized = Total_Accounts - CIP - VIP - Ordinary;
            System.out.println("Uncategorized : " + Uncategorized);

            con.close();
        }
        catch (SQLException e)
        {
            System.out.println("Error while connecting to the database : " + e);
        }
        catch (ClassNotFoundException e)
        {
            System.out.println("Driver Not Found : " + e);
        }
        System.out.println("Thank you!");
    }
}




