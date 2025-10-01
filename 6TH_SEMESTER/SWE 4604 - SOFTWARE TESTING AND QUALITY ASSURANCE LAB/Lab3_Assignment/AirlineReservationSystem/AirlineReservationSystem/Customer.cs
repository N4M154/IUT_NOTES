using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineReservationSystem
{
    public class Customer
    {
        // ****************************** Fields ******************************
        public string UserID { get; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Password { get; }
        public string Address { get; set; }
        public int Age { get; set; }
        public List<Flight> FlightsRegisteredByUser { get; set; } = new List<Flight>();
        public List<int> NumOfTicketsBookedByUser { get; set; } = new List<int>();

        public static List<Customer> CustomerCollection { get; } = User.GetCustomersCollection();

        // ****************************** Constructors ******************************
        public Customer()
        {
            UserID = null;
            Name = null;
            Email = null;
            Password = null;
            Phone = null;
            Address = null;
            Age = 0;
        }

        public Customer(string name, string email, string password, string phone, string address, int age)
        {
            var random = new RandomGenerator();
            random.RandomIDGen();
            UserID = random.GetRandomNumber();
            Name = name;
            Email = email;
            Password = password;
            Phone = phone;
            Address = address;
            Age = age;
        }

        // ****************************** Methods ******************************

        public void AddNewCustomer()
        {
            Console.WriteLine("\n\n\n++++++++++++++++ Welcome to the Customer Registration Portal ++++++++++++++++");
            Console.Write("Enter your name: ");
            var name = Console.ReadLine();
            Console.Write("Enter your email address: ");
            var email = Console.ReadLine();

            while (IsEmailAlreadyRegistered(email))
            {
                Console.WriteLine("ERROR: Email already exists. Try again.");
                Console.Write("Enter your email address: ");
                email = Console.ReadLine();
            }

            Console.Write("Enter your password: ");
            var password = Console.ReadLine();
            Console.Write("Enter your phone number: ");
            var phone = Console.ReadLine();
            Console.Write("Enter your address: ");
            var address = Console.ReadLine();
            Console.Write("Enter your age: ");
            int age = int.Parse(Console.ReadLine());

            CustomerCollection.Add(new Customer(name, email, password, phone, address, age));
        }

        public bool IsEmailAlreadyRegistered(string emailID)
        {
            return CustomerCollection.Any(c => c.Email == emailID);
        }

        public void SearchUser(string id)
        {
            var customer = CustomerCollection.FirstOrDefault(c => c.UserID == id);
            if (customer != null)
            {
                Console.WriteLine("\nCustomer Found! Here is the record:\n");
                DisplayHeader();
                Console.WriteLine(customer.ToFormattedString(1));
                DisplayFooter();
            }
            else
            {
                Console.WriteLine($"No Customer with the ID {id} Found.");
            }
        }

        public void EditUserInfo(string id)
        {
            var customer = CustomerCollection.FirstOrDefault(c => c.UserID == id);
            if (customer != null)
            {
                Console.Write("Enter new name: ");
                string inputName = Console.ReadLine();
                customer.Name = string.IsNullOrWhiteSpace(inputName) ? customer.Name : inputName.Trim();
                Console.Write("Enter new email: ");
                string inputEmail = Console.ReadLine();
                customer.Email = string.IsNullOrWhiteSpace(inputEmail) ? customer.Email : inputEmail.Trim();
                Console.Write("Enter new phone number: ");
                string inputPhone = Console.ReadLine();
                customer.Phone = string.IsNullOrWhiteSpace(inputPhone) ? customer.Phone : inputPhone.Trim();
                Console.Write("Enter new address: ");
                string inputAddress = Console.ReadLine();
                customer.Address = string.IsNullOrWhiteSpace(inputAddress) ? customer.Address : inputAddress.Trim();
                Console.Write("Enter new age: ");
                string inputAge = Console.ReadLine();
                customer.Age = string.IsNullOrWhiteSpace(inputAge) ? customer.Age : int.Parse(inputAge.Trim());

                DisplayAllCustomers(true);
            }
            else
            {
                Console.WriteLine($"No Customer with the ID {id} Found.");
            }
        }

        public void DeleteUser(string id)
        {
            var customer = CustomerCollection.FirstOrDefault(c => c.UserID == id);
            if (customer != null)
            {
                CustomerCollection.Remove(customer);
                Console.WriteLine($"Customer with ID {id} deleted. Updated List:");
                DisplayAllCustomers(true);
            }
            else
            {
                Console.WriteLine($"No Customer with the ID {id} Found.");
            }
        }

        public void AddNewFlightToCustomerList(Flight flight)
        {
            FlightsRegisteredByUser.Add(flight);
        }

        public void AddExistingFlightToCustomerList(int index, int numOfTickets)
        {
            NumOfTicketsBookedByUser[index] += numOfTickets;
        }

        public void DisplayAllCustomers(bool showHeader)
        {
            if (showHeader)
                DisplayHeader();
            int i = 1;
            foreach (var c in CustomerCollection)
            {
                Console.WriteLine(c.ToFormattedString(i++));
            }
            DisplayFooter();
        }

        private void DisplayHeader()
        {
            Console.WriteLine("+------------+------------+------------------------+-----+----------------------+----------------------+------------------+");
            Console.WriteLine("| SerialNum  |   UserID   | Name                   | Age | Email                | Address              | Phone            |");
            Console.WriteLine("+------------+------------+------------------------+-----+----------------------+----------------------+------------------+");
        }

        private void DisplayFooter()
        {
            Console.WriteLine("+------------+------------+------------------------+-----+----------------------+----------------------+------------------+");
        }

        public string ToFormattedString(int index)
        {
            return string.Format("| {0,-10} | {1,-10} | {2,-22} | {3,3} | {4,-20} | {5,-20} | {6,-16} |",
                index,
                FormatUserID(UserID),
                Name,
                Age,
                Email,
                Address,
                Phone);
        }

        private string FormatUserID(string userId)
        {
            if (userId.Length <= 3) return userId;
            return userId.Insert(3, " ");
        }

        /// <summary>
        /// Adds space between userID to increase its readability.
        /// Example: "920 191" is more readable than "920191".
        /// </summary>
        /// <param name="randomID">ID to add space to</param>
        /// <returns>ID with added space</returns>
        public string RandomIDDisplay(string randomID)
        {
            StringBuilder newString = new StringBuilder();
            for (int i = 0; i <= randomID.Length; i++)
            {
                if (i == 3)
                {
                    newString.Append(" ").Append(randomID[i]);
                }
                else if (i < randomID.Length)
                {
                    newString.Append(randomID[i]);
                }
            }
            return newString.ToString();
        }


    }
}
