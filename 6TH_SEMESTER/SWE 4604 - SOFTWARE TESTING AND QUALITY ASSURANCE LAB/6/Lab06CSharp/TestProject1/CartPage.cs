using OpenQA.Selenium;

namespace Lab06
{

    public class CartPage : BaseTest
    {
        [Fact]
        public void TestBuyNowPayLater()
        {

            //1st:login
            driver.Navigate().GoToUrl("https://practicesoftwaretesting.com/auth/login");

            var email = driver.FindElement(By.Id("email"));
            email.SendKeys("customer@practicesoftwaretesting.com");
            var password = driver.FindElement(By.Id("password"));
            password.SendKeys("welcome01");
            var submitbtn = driver.FindElement(By.ClassName("btnSubmit"));
            submitbtn.Click();

            //2nd: Add product to cart
            var home = driver.FindElement(By.CssSelector("a[data-test='nav-home']"));
            home.Click();

            var clawhammer = driver.FindElement(By.XPath("//h5[@data-test='product-name' and normalize-space(text())='Claw Hammer']"));
            clawhammer.Click();

            var addtocartbtn = driver.FindElement(By.Id("btn-add-to-cart"));
            addtocartbtn.Click();

            var alert = driver.FindElement(By.CssSelector("div[role='alert']"));
            alert.Click();

            var carticon = driver.FindElement(By.CssSelector("a[data-test='nav-cart']"));
            carticon.Click();

            var proceedbtn = driver.FindElement(By.CssSelector("button[data-test='proceed-1']"));
            proceedbtn.Click();

            //relogin cause it can't get the session id
            var reemail = driver.FindElement(By.Id("email"));
            reemail.SendKeys("customer@practicesoftwaretesting.com");
            var repassword = driver.FindElement(By.Id("password"));
            repassword.SendKeys("welcome01");
            var resubmitbtn = driver.FindElement(By.CssSelector("input[data-test='login-submit']"));
            resubmitbtn.Click();
            var finalsubmitbtn = driver.FindElement(By.CssSelector("button[data-test='proceed-2']"));
            finalsubmitbtn.Click();

            // 4th: Billing info
            var street = driver.FindElement(By.Id("street"));
            street.SendKeys("Board Bazar");
            var city = driver.FindElement(By.Id("city"));
            city.SendKeys("Gazipur");
            var state = driver.FindElement(By.Id("state"));
            state.SendKeys("Dhaka");
            var country = driver.FindElement(By.Id("country"));
            country.SendKeys("Bangladesh");
            var postcode = driver.FindElement(By.Id("postal_code"));
            postcode.SendKeys("1700");
            var billsubmitbtn = driver.FindElement(By.CssSelector("button[data-test='proceed-3']"));
            billsubmitbtn.Click();

            // 5th: Payment
            var method = driver.FindElement(By.CssSelector("select[data-test='payment-method']"));
            method.Click();
            var option = driver.FindElement(By.CssSelector("option[value='buy-now-pay-later']"));
            option.Click();
            var optionselect = driver.FindElement(By.CssSelector("select[data-test='monthly_installments']"));
            optionselect.Click();
            var threemonths = driver.FindElement(By.CssSelector("option[value='3']"));
            threemonths.Click();
            var finishbtn = driver.FindElement(By.CssSelector("button[data-test='finish']"));
            finishbtn.Click();
        }


        [Fact]
        public void CreditCard()
        {
            //1st:login
            driver.Navigate().GoToUrl("https://practicesoftwaretesting.com/auth/login");

            var email = driver.FindElement(By.Id("email"));
            email.SendKeys("customer@practicesoftwaretesting.com");
            var password = driver.FindElement(By.Id("password"));
            password.SendKeys("welcome01");
            var submitbtn = driver.FindElement(By.ClassName("btnSubmit"));
            submitbtn.Click();

            //2nd: Add product to cart
            var home = driver.FindElement(By.CssSelector("a[data-test='nav-home']"));
            home.Click();

            var clawhammer = driver.FindElement(By.XPath("//h5[@data-test='product-name' and normalize-space(text())='Claw Hammer']"));
            clawhammer.Click();

            var addtocartbtn = driver.FindElement(By.Id("btn-add-to-cart"));
            addtocartbtn.Click();

            var alert = driver.FindElement(By.CssSelector("div[role='alert']"));
            alert.Click();

            var carticon = driver.FindElement(By.CssSelector("a[data-test='nav-cart']"));
            carticon.Click();

            var proceedbtn = driver.FindElement(By.CssSelector("button[data-test='proceed-1']"));
            proceedbtn.Click();

            //relogin cause it can't get the session id
            var reemail = driver.FindElement(By.Id("email"));
            reemail.SendKeys("customer@practicesoftwaretesting.com");
            var repassword = driver.FindElement(By.Id("password"));
            repassword.SendKeys("welcome01");
            var resubmitbtn = driver.FindElement(By.CssSelector("input[data-test='login-submit']"));
            resubmitbtn.Click();
            var finalsubmitbtn = driver.FindElement(By.CssSelector("button[data-test='proceed-2']"));
            finalsubmitbtn.Click();

            // 4th: Billing info
            var street = driver.FindElement(By.Id("street"));
            street.SendKeys("Board Bazar");
            var city = driver.FindElement(By.Id("city"));
            city.SendKeys("Gazipur");
            var state = driver.FindElement(By.Id("state"));
            state.SendKeys("Dhaka");
            var country = driver.FindElement(By.Id("country"));
            country.SendKeys("Bangladesh");
            var postcode = driver.FindElement(By.Id("postal_code"));
            postcode.SendKeys("1700");
            var billsubmitbtn = driver.FindElement(By.CssSelector("button[data-test='proceed-3']"));
            billsubmitbtn.Click();

            // 5th: Payment
            var cardmethod = driver.FindElement(By.CssSelector("select[data-test='payment-method']"));
            cardmethod.Click();
            var cardmethodselect = driver.FindElement(By.CssSelector("option[value='credit-card']"));
            cardmethodselect.Click();

            var cardnum = driver.FindElement(By.Id("credit_card_number"));
            cardnum.SendKeys("1212-1212-1212-1212");
            var expiredate = driver.FindElement(By.Id("expiration_date"));
            expiredate.SendKeys("12/2025");
            var cvv = driver.FindElement(By.Id("cvv"));
            cvv.SendKeys("112");
            var cardholder = driver.FindElement(By.Id("card_holder_name"));
            cardholder.SendKeys("Namisa Najah Raisa");

            var cardsubmitbtn = driver.FindElement(By.CssSelector("button[data-test='finish']"));
            cardsubmitbtn.Click();
        }

    }
}
