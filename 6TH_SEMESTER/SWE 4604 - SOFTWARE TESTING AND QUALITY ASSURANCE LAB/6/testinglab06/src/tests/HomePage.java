package tests;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

//210042112

public class HomePage extends BaseTest {

    @Test
    public void Sorting()
    {
        WebElement dropdown = driver.findElement(By.cssSelector("select[data-test='sort']"));
        dropdown.click();


        WebElement option = driver.findElement(By.cssSelector("option[value='price,desc']"));
        option.click();
    }

    @Test
    public void SearchBar()
    {
        WebElement textBox = driver.findElement(By.cssSelector("input[data-test='search-query']"));
        textBox.sendKeys("tool cabinet");

        WebElement searchButton = driver.findElement(By.cssSelector("button[data-test='search-submit']"));
        searchButton.click();

    }

    @Test
    public void FilterCheckBoxByCategory()
    {

        WebElement hammerCheckbox = driver.findElement(By.xpath("//label[contains(., 'Hammer')]/input[@type='checkbox']"));
        if (!hammerCheckbox.isSelected())
        {
            hammerCheckbox.click();
        }
    }


    @Test
    public void FilterCheckBoxByBrand()
    {
        WebElement forgeflexCheckbox = driver.findElement(By.xpath("//label[contains(., ' ForgeFlex Tools')]/input[@type='checkbox']"));
        if (!forgeflexCheckbox.isSelected())
        {
            forgeflexCheckbox.click();
        }

    }

    @Test
    public void PriceRange()
    {
        WebElement minelement = driver.findElement(By.cssSelector(".ngx-slider-pointer-min"));
        Actions minbuilder = new Actions(driver);
        minbuilder.moveToElement(minelement).clickAndHold().perform();
        minelement.click();

        WebElement maxelement = driver.findElement(By.cssSelector(".ngx-slider-pointer-max"));
        Actions maxbuilder = new Actions(driver);
        maxbuilder.moveToElement(maxelement).clickAndHold().perform();
        maxelement.click();
    }

}

// -_- N4M154 -_-