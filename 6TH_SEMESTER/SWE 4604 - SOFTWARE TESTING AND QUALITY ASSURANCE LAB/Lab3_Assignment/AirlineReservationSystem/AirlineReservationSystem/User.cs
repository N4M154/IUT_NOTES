using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
/*
 * This class is intended to be the main class for this Project. All necessary methods are getting calls from this class.
 *
 *
 */

namespace AirlineReservationSystem
{
    public class User
    {
        // ************************************************************ Fields
        // ************************************************************

        /*
         * 2D Array to store admin credentials. Default credentials are stored on [0][0]
         * index. Max num of admins can be 10....
         */
        public static string[,] adminUserNameAndPassword = new string[10, 2];
        protected static List<Customer> customersCollection = new List<Customer>();

        // ************************************************************
        // Behaviours/Methods
        // ************************************************************

        public static void Main(string[] args)
        {
            int countNumOfUsers = 1;
            RolesAndPermissions r1 = new RolesAndPermissions();
            Flight f1 = new Flight();
            FlightReservation bookingAndReserving = new FlightReservation();
            Customer c1 = new Customer();
            f1.FlightScheduler();

            Console.WriteLine(
                "\n\t\t\t\t\t+++++++++++++ Welcome to BAV AirLines +++++++++++++\n\nTo Further Proceed, Please enter a value.");
            Console.WriteLine(
                "\n***** Default Username && Password is root-root ***** Using Default Credentials will restrict you to just view the list of Passengers....\n");
            DisplayMainMenu();
            int desiredOption = int.Parse(Console.ReadLine());
            while (desiredOption < 0 || desiredOption > 8)
            {
                Console.Write("ERROR!! Please enter value between 0 - 4. Enter the value again :\t");
                desiredOption = int.Parse(Console.ReadLine());
            }

            do
            {
                /*
                 * If desiredOption is 1 then call the login method.... if default credentials
                 * are used then set the permission
                 * level to standard/default where the user can just view the customer's
                 * data...if not found, then return -1, and if
                 * data is found then show the user display menu for adding, updating, deleting
                 * and searching users/customers...
                 */
                if (desiredOption == 1)
                {
                    /* Default username and password.... */
                    adminUserNameAndPassword[0, 0] = "root";
                    adminUserNameAndPassword[0, 1] = "root";

                    Console.Write("\nEnter the UserName to login to the Management System :     ");
                    string username = Console.ReadLine();
                    Console.Write("Enter the Password to login to the Management System :    ");
                    string password = Console.ReadLine();
                    Console.WriteLine();

                    /* Checking the RolesAndPermissions...... */
                    if (r1.IsPrivilegedUserOrNot(username, password) == -1)
                    {
                        Console.WriteLine(
                            $"\n{"",20}ERROR!!! Unable to login Cannot find user with the entered credentials.... Try Creating New Credentials or get yourself register by pressing 4....\n");
                    }
                    else if (r1.IsPrivilegedUserOrNot(username, password) == 0)
                    {
                        Console.WriteLine(
                            "You've standard/default privileges to access the data... You can just view customers data..." +
                            "Can't perform any actions on them....");
                        c1.DisplayAllCustomers(true);
                    }
                    else
                    {
                        Console.WriteLine(
                            $"{"",20}Logged in Successfully as \"{username}\"..... For further Proceedings, enter a value from below....");

                        /*
                         * Going to Display the CRUD operations to be performed by the privileged
                         * user.....Which includes Creating, Updating
                         * Reading(Searching) and deleting a customer....
                         */
                        do
                        {
                            Console.WriteLine($"\n\n{"",60}+++++++++ 2nd Layer Menu +++++++++{"",50}Logged in as \"{username}\"\n");
                            Console.WriteLine($"{"",30} (a) Enter 1 to add new Passenger....");
                            Console.WriteLine($"{"",30} (b) Enter 2 to search a Passenger....");
                            Console.WriteLine($"{"",30} (c) Enter 3 to update the Data of the Passenger....");
                            Console.WriteLine($"{"",30} (d) Enter 4 to delete a Passenger....");
                            Console.WriteLine($"{"",30} (e) Enter 5 to Display all Passengers....");
                            Console.WriteLine($"{"",30} (f) Enter 6 to Display all flights registered by a Passenger..");
                            Console.WriteLine($"{"",30} (g) Enter 7 to Display all registered Passengers in a Flight....");
                            Console.WriteLine($"{"",30} (h) Enter 8 to Delete a Flight....");
                            Console.WriteLine($"{"",30} (i) Enter 0 to Go back to the Main Menu/Logout....");
                            Console.Write("Enter the desired Choice :   ");
                            desiredOption = int.Parse(Console.ReadLine());

                            /* If 1 is entered by the privileged user, then add a new customer...... */
                            if (desiredOption == 1)
                            {
                                c1.AddNewCustomer();
                            }
                            else if (desiredOption == 2)
                            {
                                /*
                                 * If 2 is entered by the privileged user, then call the search method of the
                                 * Customer class
                                 */
                                c1.DisplayAllCustomers(false);
                                Console.Write("Enter the CustomerID to Search :\t");
                                string customerID = Console.ReadLine();
                                Console.WriteLine();
                                c1.SearchUser(customerID);
                            }
                            else if (desiredOption == 3)
                            {
                                /*
                                 * If 3 is entered by the user, then call the update method of the Customer
                                 * Class with required
                                 * arguments.....
                                 */
                                c1.DisplayAllCustomers(false);
                                Console.Write("Enter the CustomerID to Update its Data :\t");
                                string customerID = Console.ReadLine();
                                if (customersCollection.Count > 0)
                                {
                                    c1.EditUserInfo(customerID);
                                }
                                else
                                {
                                    Console.WriteLine($"{"",50}No Customer with the ID {customerID} Found...!!!\n");
                                }
                            }
                            else if (desiredOption == 4)
                            {
                                /*
                                 * If 4 is entered, then ask the user to enter the customer id, and then delete
                                 * that customer....
                                 */
                                c1.DisplayAllCustomers(false);
                                Console.Write("Enter the CustomerID to Delete its Data :\t");
                                string customerID = Console.ReadLine();
                                if (customersCollection.Count > 0)
                                {
                                    c1.DeleteUser(customerID);
                                }
                                else
                                {
                                    Console.WriteLine($"{"",50}No Customer with the ID {customerID} Found...!!!\n");
                                }
                            }
                            else if (desiredOption == 5)
                            {
                                /* Call the Display Method of Customer Class.... */
                                c1.DisplayAllCustomers(false);
                            }
                            else if (desiredOption == 6)
                            {
                                c1.DisplayAllCustomers(false);
                                Console.Write(
                                    "\n\nEnter the ID of the user to display all flights registered by that user...");
                                string id = Console.ReadLine();
                                bookingAndReserving.DisplayFlightsRegisteredByOneUser(id);
                            }
                            else if (desiredOption == 7)
                            {
                                Console.Write(
                                    "Do you want to display Passengers of all flights or a specific flight.... 'Y/y' for displaying all flights and 'N/n' to look for a" +
                                    " specific flight.... ");
                                char choice = Console.ReadLine()[0];
                                if (choice == 'y' || choice == 'Y')
                                {
                                    bookingAndReserving.DisplayRegisteredUsersForAllFlights();
                                }
                                else if (choice == 'n' || choice == 'N')
                                {
                                    f1.DisplayFlightSchedule();
                                    Console.Write(
                                        "Enter the Flight Number to display the list of passengers registered in that flight... ");
                                    string flightNum = Console.ReadLine();
                                    bookingAndReserving.DisplayRegisteredUsersForSpecificFlight(flightNum);
                                }
                                else
                                {
                                    Console.WriteLine("Invalid Choice...No Response...!");
                                }
                            }
                            else if (desiredOption == 8)
                            {
                                f1.DisplayFlightSchedule();
                                Console.Write("Enter the Flight Number to delete the flight : ");
                                string flightNum = Console.ReadLine();
                                f1.DeleteFlight(flightNum);
                            }
                            else if (desiredOption == 0)
                            {
                                Console.WriteLine("Thanks for Using BAV Airlines Ticketing System...!!!");
                            }
                            else
                            {
                                Console.WriteLine(
                                    "Invalid Choice...Looks like you're Robot...Entering values randomly...You've Have to login again...");
                                desiredOption = 0;
                            }

                        } while (desiredOption != 0);
                    }
                }
                else if (desiredOption == 2)
                {
                    /*
                     * If desiredOption is 2, then call the registration method to register a
                     * user......
                     */
                    Console.Write("\nEnter the UserName to Register :    ");
                    string username = Console.ReadLine();
                    Console.Write("Enter the Password to Register :     ");
                    string password = Console.ReadLine();
                    while (r1.IsPrivilegedUserOrNot(username, password) != -1)
                    {
                        Console.Write("ERROR!!! Admin with same UserName already exist. Enter new UserName:   ");
                        username = Console.ReadLine();
                        Console.Write("Enter the Password Again:   ");
                        password = Console.ReadLine();
                    }

                    /* Setting the credentials entered by the user..... */
                    adminUserNameAndPassword[countNumOfUsers, 0] = username;
                    adminUserNameAndPassword[countNumOfUsers, 1] = password;

                    /* Incrementing the numOfUsers */
                    countNumOfUsers++;
                }
                else if (desiredOption == 3)
                {
                    Console.Write("\n\nEnter the Email to Login : \t");
                    string userName = Console.ReadLine();
                    Console.Write("Enter the Password : \t");
                    string password = Console.ReadLine();
                    string[] result = r1.IsPassengerRegistered(userName, password).Split('-');

                    if (int.Parse(result[0]) == 1)
                    {
                        int desiredChoice;
                        Console.WriteLine(
                            $"\n\n{"",20}Logged in Successfully as \"{userName}\"..... For further Proceedings, enter a value from below....");
                        do
                        {
                            Console.WriteLine($"\n\n{"",60}+++++++++ 3rd Layer Menu +++++++++{"",50}Logged in as \"{userName}\"\n");
                            Console.WriteLine($"{"",40} (a) Enter 1 to Book a flight....");
                            Console.WriteLine($"{"",40} (b) Enter 2 to update your Data....");
                            Console.WriteLine($"{"",40} (c) Enter 3 to delete your account....");
                            Console.WriteLine($"{"",40} (d) Enter 4 to Display Flight Schedule....");
                            Console.WriteLine($"{"",40} (e) Enter 5 to Cancel a Flight....");
                            Console.WriteLine($"{"",40} (f) Enter 6 to Display all flights registered by \"{userName}\"....");
                            Console.WriteLine($"{"",40} (g) Enter 0 to Go back to the Main Menu/Logout....");
                            Console.Write("Enter the desired Choice :   ");
                            desiredChoice = int.Parse(Console.ReadLine());

                            if (desiredChoice == 1)
                            {
                                f1.DisplayFlightSchedule();
                                Console.Write("\nEnter the desired flight number to book :\t ");
                                string flightToBeBooked = Console.ReadLine();
                                Console.Write("Enter the Number of tickets for " + flightToBeBooked + " flight :   ");
                                int numOfTickets = int.Parse(Console.ReadLine());
                                while (numOfTickets > 10)
                                {
                                    Console.Write(
                                        "ERROR!! You can't book more than 10 tickets at a time for single flight....Enter number of tickets again : ");
                                    numOfTickets = int.Parse(Console.ReadLine());
                                }
                                bookingAndReserving.BookFlight(flightToBeBooked, numOfTickets, result[1]);
                            }
                            else if (desiredChoice == 2)
                            {
                                c1.EditUserInfo(result[1]);
                            }
                            else if (desiredChoice == 3)
                            {
                                Console.Write(
                                    "Are you sure to delete your account...It's an irreversible action...Enter Y/y to confirm...");
                                char confirmationChar = Console.ReadLine()[0];
                                if (confirmationChar == 'Y' || confirmationChar == 'y')
                                {
                                    c1.DeleteUser(result[1]);
                                    Console.WriteLine($"User {userName}'s account deleted Successfully...!!!");
                                    desiredChoice = 0;
                                }
                                else
                                {
                                    Console.WriteLine("Action has been cancelled...");
                                }
                            }
                            else if (desiredChoice == 4)
                            {
                                f1.DisplayFlightSchedule();
                                f1.DisplayMeasurementInstructions();
                            }
                            else if (desiredChoice == 5)
                            {
                                bookingAndReserving.CancelFlight(result[1]);
                            }
                            else if (desiredChoice == 6)
                            {
                                bookingAndReserving.DisplayFlightsRegisteredByOneUser(result[1]);
                            }
                            else
                            {
                                if (desiredChoice != 0)
                                {
                                    Console.WriteLine(
                                        "Invalid Choice...Looks like you're Robot...Entering values randomly...You've Have to login again...");
                                }
                                desiredChoice = 0;
                            }
                        } while (desiredChoice != 0);
                    }
                    else
                    {
                        Console.WriteLine(
                            $"\n{"",20}ERROR!!! Unable to login Cannot find user with the entered credentials.... Try Creating New Credentials or get yourself register by pressing 4....\n");
                    }
                }
                else if (desiredOption == 4)
                {
                    c1.AddNewCustomer();
                }
                else if (desiredOption == 5)
                {
                    ManualInstructions();
                }

                DisplayMainMenu();
                desiredOption = int.Parse(Console.ReadLine());
                while (desiredOption < 0 || desiredOption > 8)
                {
                    Console.Write("ERROR!! Please enter value between 0 - 4. Enter the value again :\t");
                    desiredOption = int.Parse(Console.ReadLine());
                }
            } while (desiredOption != 0);
        }

        static void DisplayMainMenu()
        {
            Console.WriteLine("\n\n\t\t(a) Press 0 to Exit.");
            Console.WriteLine("\t\t(b) Press 1 to Login as admin.");
            Console.WriteLine("\t\t(c) Press 2 to Register as admin.");
            Console.WriteLine("\t\t(d) Press 3 to Login as Passenger.");
            Console.WriteLine("\t\t(e) Press 4 to Register as Passenger.");
            Console.WriteLine("\t\t(f) Press 5 to Display the User Manual.");
            Console.Write("\t\tEnter the desired option:    ");
        }

        static void ManualInstructions()
        {
            Console.WriteLine($"\n\n{"",50} {"+++++++++++++++++",15} Welcome to BAV Airlines User Manual {"+++++++++++++++++",15}");
            Console.WriteLine("\n\n\t\t(a) Press 1 to display Admin Manual.");
            Console.WriteLine("\t\t(b) Press 2 to display User Manual.");
            Console.Write("\nEnter the desired option :    ");
            int choice = int.Parse(Console.ReadLine());
            while (choice < 1 || choice > 2)
            {
                Console.Write("ERROR!!! Invalid entry...Please enter a value either 1 or 2....Enter again....");
                choice = int.Parse(Console.ReadLine());
            }
            if (choice == 1)
            {
                Console.WriteLine(
                    "\n\n(1) Admin have the access to all users data...Admin can delete, update, add and can perform search for any customer...\n");
                Console.WriteLine(
                    "(2) In order to access the admin module, you've to get yourself register by pressing 2, when the main menu gets displayed...\n");
                Console.WriteLine(
                    "(3) Provide the required details i.e., name, email, id...Once you've registered yourself, press 1 to login as an admin... \n");
                Console.WriteLine(
                    "(4) Once you've logged in, 2nd layer menu will be displayed on the screen...From here on, you can select from variety of options...\n");
                Console.WriteLine(
                    "(5) Pressing \"1\" will add a new Passenger, provide the program with required details to add the passenger...\n");
                Console.WriteLine(
                    "(6) Pressing \"2\" will search for any passenger, given the admin(you) provides the ID from the table printing above....  \n");
                Console.WriteLine(
                    "(7) Pressing \"3\" will let you update any passengers data given the user ID provided to program...\n");
                Console.WriteLine("(8) Pressing \"4\" will let you delete any passenger given its ID provided...\n");
                Console.WriteLine("(9) Pressing \"5\" will let you display all registered passenger...\n");
                Console.WriteLine(
                    "(10) Pressing \"6\" will let you display all registered passengers...After selecting, program will ask, if you want to display passengers for all flights(Y/y) or a specific flight(N/n)\n");
                Console.WriteLine(
                    "(11) Pressing \"7\" will let you delete any flight given its flight number provided...\n");
                Console.WriteLine(
                    "(11) Pressing \"0\" will make you logged out of the program...You can login again any time you want during the program execution....\n");
            }
            else
            {
                Console.WriteLine(
                    "\n\n(1) Local user has the access to its data only...He/She won't be able to change/update other users data...\n");
                Console.WriteLine(
                    "(2) In order to access local users benefits, you've to get yourself register by pressing 4, when the main menu gets displayed...\n");
                Console.WriteLine(
                    "(3) Provide the details asked by the program to add you to the users list...Once you've registered yourself, press \"3\" to login as a passenger...\n");
                Console.WriteLine(
                    "(4) Once you've logged in, 3rd layer menu will be displayed...From here on, you embarked on the journey to fly with us...\n");
                Console.WriteLine(
                    "(5) Pressing \"1\" will display available/scheduled list of flights...To get yourself booked for a flight, enter the flight number and number of tickets for the flight...Max num of tickets at a time is 10 ...\n");
                Console.WriteLine(
                    "(7) Pressing \"2\" will let you update your own data...You won't be able to update other's data... \n");
                Console.WriteLine("(8) Pressing \"3\" will delete your account... \n");
                Console.WriteLine(
                    "(9) Pressing \"4\" will display randomly designed flight schedule for this runtime...\n");
                Console.WriteLine("(10) Pressing \"5\" will let you cancel any flight registered by you...\n");
                Console.WriteLine("(11) Pressing \"6\" will display all flights registered by you...\n");
                Console.WriteLine(
                    "(12) Pressing \"0\" will make you logout of the program...You can login back at anytime with your credentials...for this particular run-time... \n");
            }
        }

        // ************************************************************ Setters &
        // Getters ************************************************************

        public static List<Customer> GetCustomersCollection()
        {
            return customersCollection;
        }
    }
}
