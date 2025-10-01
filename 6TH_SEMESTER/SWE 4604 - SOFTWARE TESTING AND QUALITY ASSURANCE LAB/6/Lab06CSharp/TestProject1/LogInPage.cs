using OpenQA.Selenium;

namespace Lab06
{
    public class LogInPage : BaseTest
    {
        [Fact]
        public void TestLogIn()
        {
            driver.Navigate().GoToUrl("https://practicesoftwaretesting.com/auth/login");

            var email = driver.FindElement(By.Id("email"));
            email.SendKeys("customer@practicesoftwaretesting.com");//taken from the pdf provided

            var password = driver.FindElement(By.Id("password"));
            password.SendKeys("welcome01");//taken from the pdf provided

            var loginbtn = driver.FindElement(By.ClassName("btnSubmit"));
            loginbtn.Click();

        }
    }
}
