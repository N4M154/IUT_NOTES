using OpenQA.Selenium;

namespace Lab06
{
    public class FavoritesPage : BaseTest
    {
        [Fact]
        public void TestFavoritesAfterLogin()
        {
            //1st : login
            driver.Navigate().GoToUrl("https://practicesoftwaretesting.com/auth/login");

            var email = driver.FindElement(By.Id("email"));
            email.SendKeys("customer@practicesoftwaretesting.com");

            var password = driver.FindElement(By.Id("password"));
            password.SendKeys("welcome01");

            var loginbtn = driver.FindElement(By.ClassName("btnSubmit"));
            loginbtn.Click();

            //2nd: add product to favorite
            var home = driver.FindElement(By.CssSelector("a[data-test='nav-home']"));
            home.Click();

            var clawHammer = driver.FindElement(By.XPath("//h5[@data-test='product-name' and normalize-space(text())='Claw Hammer']"));
            clawHammer.Click();

            var addtofavoritebtn = driver.FindElement(By.Id("btn-add-to-favorites"));
            addtofavoritebtn.Click();

        }
    }
}
