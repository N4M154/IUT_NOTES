using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineReservationSystem
{
    public class RolesAndPermissions : User
    {
        // Assuming adminUserNameAndPassword is declared somewhere in User or this class
        // Example declaration (adjust as per your actual code):
        // protected string[,] adminUserNameAndPassword;

        /// <summary>
        /// Checks if the admin with specified credentials is registered or not.
        /// </summary>
        /// <param name="username">Username of the imaginary admin</param>
        /// <param name="password">Password of the imaginary admin</param>
        /// <returns>-1 if admin not found, else index of the admin in the array.</returns>
        public int IsPrivilegedUserOrNot(string username, string password)
        {
            int isFound = -1;
            for (int i = 0; i < adminUserNameAndPassword.GetLength(0); i++)
            {
                if (username == adminUserNameAndPassword[i, 0])
                {
                    if (password == adminUserNameAndPassword[i, 1])
                    {
                        isFound = i;
                        break;
                    }
                }
            }
            return isFound;
        }

        /// <summary>
        /// Checks if the passenger with specified credentials is registered or not.
        /// </summary>
        /// <param name="email">Email of the specified passenger</param>
        /// <param name="password">Password of the specified passenger</param>
        /// <returns>"0" if not found; otherwise "1-" concatenated with the userID</returns>
        public string IsPassengerRegistered(string email, string password)
        {
            string isFound = "0";
            foreach (Customer c in Customer.CustomerCollection)
            {
                if (email == c.Email)
                {
                    if (password == c.Password)
                    {
                        isFound = "1-" + c.UserID;
                        break;
                    }
                }
            }
            return isFound;
        }
    }

}
