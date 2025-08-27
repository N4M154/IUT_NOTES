using OpenQA.Selenium;


namespace Lab06
{
    public class ProfilePage : BaseTest
    {
        [Fact]
        public void UpdateProfileInformationPhoneNumber()
        {

            driver.Navigate().GoToUrl("https://practicesoftwaretesting.com/auth/login");


            var email = driver.FindElement(By.Id("email"));
            email.SendKeys("customer@practicesoftwaretesting.com"); // Retrieved from the PDF
            var pass = driver.FindElement(By.Id("password"));
            pass.SendKeys("welcome01"); // retrieved from the PDF
            var submitbtn = driver.FindElement(By.ClassName("btnSubmit"));
            submitbtn.Click();


            var profile = driver.FindElement(By.CssSelector("a[data-test='nav-profile']"));
            profile.Click();


            var phoneInput = driver.FindElement(By.Id("phone"));
            phoneInput.SendKeys("210042112");


        }
    }
}
