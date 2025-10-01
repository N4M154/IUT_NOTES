using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;

namespace Lab06
{
    public class HomePage : BaseTest
    {
        [Fact]
        public void Sorting()
        {
            var dropdown = driver.FindElement(By.CssSelector("select[data-test='sort']"));
            dropdown.Click();


            var option = driver.FindElement(By.CssSelector("option[value='price,desc']"));
            option.Click();
        }

        [Fact]
        public void SearchBar()
        {
            var textBox = driver.FindElement(By.CssSelector("input[data-test='search-query']"));
            textBox.SendKeys("tool cabinet");

            var searchButton = driver.FindElement(By.CssSelector("button[data-test='search-submit']"));
            searchButton.Click();

        }

        [Fact]
        public void FilterCheckBoxByCategory()
        {
            //hammer
            var hammerCheckbox = driver.FindElement(By.XPath("//div[@class='checkbox']/label[input[@name='category_id' and @value='01K0H5EZJQ94YSYKZ59TFN2NTR']]//input"));
            if (!hammerCheckbox.Selected)
            {
                hammerCheckbox.Click();
            }

        }

        [Fact]
        public void FilterCheckBoxByBrand()
        {
            var forgeflexCheckbox = driver.FindElement(By.XPath("//div[@class='checkbox']/label[input[@name='brand_id' and @value='01K0H5EZ4J4H02FSM090Y4PDAT']]//input"));
            if (!forgeflexCheckbox.Selected)
            {
                forgeflexCheckbox.Click();
            }

        }

        [Fact]
        public void PriceRange()
        {
            var minelement = driver.FindElement(By.CssSelector(".ngx-slider-pointer-min"));
            Actions minbuilder = new Actions(driver);
            minbuilder.MoveToElement(minelement).ClickAndHold().Perform();
            minelement.Click();

            var maxelement = driver.FindElement(By.CssSelector(".ngx-slider-pointer-max"));
            Actions maxbuilder = new Actions(driver);
            maxbuilder.MoveToElement(maxelement).ClickAndHold().Perform();
            maxelement.Click();
        }



    }
}
