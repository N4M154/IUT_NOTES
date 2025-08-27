using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace Lab06
{
    public class BaseTest : IDisposable
    {
        protected IWebDriver driver;

        public BaseTest()
        {
            driver = new ChromeDriver();
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
            driver.Navigate().GoToUrl("https://practicesoftwaretesting.com/");
        }

        public void Dispose()
        {
            driver.Quit();
        }
    }
}
