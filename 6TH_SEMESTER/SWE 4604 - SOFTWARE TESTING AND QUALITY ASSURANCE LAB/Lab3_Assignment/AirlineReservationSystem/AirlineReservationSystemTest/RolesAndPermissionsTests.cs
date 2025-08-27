using AirlineReservationSystem;

namespace AirlineReservationSystemTest
{
    public class RolesAndPermissionsTests
    {

        //210042112
        /*  Tested Features:
         * - Admin Authentication (valid/invalid)
         * - Passenger Authentication (valid/invalid)
         * - Empty Credential Handling
         * - Case-Sensitive Password Verification
         */

        private readonly RolesAndPermissions _roles;
        private readonly Customer _customer;

        //helper method
        public RolesAndPermissionsTests()
        {
            _roles = new RolesAndPermissions();
            _customer = new Customer("Namisa Najah", "namisa@najah.com", "stupefy", "01730654951", "ABC", 21);
            User.GetCustomersCollection().Clear();
            User.GetCustomersCollection().Add(_customer);
            User.adminUserNameAndPassword = new string[10, 2];
            User.adminUserNameAndPassword[0, 0] = "admin";
            User.adminUserNameAndPassword[0, 1] = "admin112";
        }

        [Fact]
        public void IsPrivilegedUserOrNot_ShouldReturnIndexForValidAdmin()
        {
            var result = _roles.IsPrivilegedUserOrNot("admin", "admin112");
            Assert.Equal(0, result);
        }

        [Fact]
        public void IsPrivilegedUserOrNot_ShouldReturnNegativeOneForInvalidAdmin()
        {
            var result = _roles.IsPrivilegedUserOrNot("wrong", "credentials");
            Assert.Equal(-1, result);
        }

        [Fact]
        public void IsPassengerRegistered_ShouldReturnUserIdForValidCredentials()
        {
            var result = _roles.IsPassengerRegistered("namisa@najah.com", "stupefy");
            Assert.StartsWith("1-", result);
        }

        [Fact]
        public void IsPassengerRegistered_ShouldReturnZeroForInvalidCredentials()
        {
            var result = _roles.IsPassengerRegistered("wrong@credentials.com", "112112");
            Assert.Equal("0", result);
        }


        [Fact]
        public void RejectsEmptyCredentials()
        {
            Assert.Equal(-1, _roles.IsPrivilegedUserOrNot("", ""));
            Assert.Equal("0", _roles.IsPassengerRegistered(null, null));
        }

        [Fact]
        public void HandlesCaseSensitivePasswords()
        {
            Assert.Equal("0", _roles.IsPassengerRegistered("namisa@najah.com", "STUPEFY"));
        }
    }
}
/*-_- N4M154 -_-*/