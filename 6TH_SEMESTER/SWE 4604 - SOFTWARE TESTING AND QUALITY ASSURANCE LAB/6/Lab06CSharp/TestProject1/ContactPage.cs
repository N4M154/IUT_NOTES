using OpenQA.Selenium;

namespace Lab06
{
    public class ContactPage : BaseTest
    {
        [Fact]
        public void ContactSubmit()
        {
            driver.Navigate().GoToUrl("https://practicesoftwaretesting.com/contact");

            var firstName = driver.FindElement(By.Id("first_name"));
            firstName.SendKeys("Namisa");

            var lastName = driver.FindElement(By.Id("last_name"));
            lastName.SendKeys("Najah");

            var email = driver.FindElement(By.Id("email"));
            email.SendKeys("namisa.najah.raisa@gmail.com");

            var subjectDropdown = driver.FindElement(By.Id("subject"));
            subjectDropdown.Click();

            var warrantyOption = driver.FindElement(By.CssSelector("option[value='warranty']"));
            warrantyOption.Click();

            var messageBox = driver.FindElement(By.Id("message"));
            messageBox.SendKeys("This is a test message.");

            var submitButton = driver.FindElement(By.ClassName("btnSubmit"));
            submitButton.Click();

        }
    }
}
