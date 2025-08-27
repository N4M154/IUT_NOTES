using OpenQA.Selenium;

namespace Lab06
{
    public class ProductsDetailsPage : BaseTest
    {
        [Fact]
        public void TestProductIncreaseDecrease()
        {
            var clawHammer = driver.FindElement(By.XPath("//h5[@data-test='product-name' and normalize-space(text())='Claw Hammer']"));
            clawHammer.Click();

            var increasebtn = driver.FindElement(By.Id("btn-increase-quantity"));
            increasebtn.Click();

            var decreasebtn = driver.FindElement(By.Id("btn-decrease-quantity"));
            decreasebtn.Click();
        }
        [Fact]
        public void TestAddtoCart()
        {
            var clawHammer = driver.FindElement(By.XPath("//h5[@data-test='product-name' and normalize-space(text())='Claw Hammer']"));
            clawHammer.Click();

            var addtocartbtn = driver.FindElement(By.Id("btn-add-to-cart"));
            addtocartbtn.Click();
        }

        [Fact]
        public void TestAddtoFavorites()
        {
            var clawHammer = driver.FindElement(By.XPath("//h5[@data-test='product-name' and normalize-space(text())='Claw Hammer']"));
            clawHammer.Click();

            var addtofavbtn = driver.FindElement(By.Id("btn-add-to-favorites"));
            addtofavbtn.Click();
        }
    }
}
