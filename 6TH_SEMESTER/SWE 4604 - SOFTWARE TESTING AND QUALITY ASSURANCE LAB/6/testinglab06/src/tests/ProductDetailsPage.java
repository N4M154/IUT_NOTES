package tests;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

//210042112

public class ProductDetailsPage extends BaseTest{

    @Test
    public void TestProductIncreaseDecrease()
    {
        WebElement clawHammer = driver.findElement(By.xpath("//h5[@data-test='product-name' and normalize-space(text())='Claw Hammer']"));
        clawHammer.click();

        WebElement increasebtn = driver.findElement(By.id("btn-increase-quantity"));
        increasebtn.click();

        WebElement decreasebtn = driver.findElement(By.id("btn-decrease-quantity"));
        decreasebtn.click();
    }

    @Test
    public void TestAddtoCart()
    {
        WebElement clawHammer = driver.findElement(By.xpath("//h5[@data-test='product-name' and normalize-space(text())='Claw Hammer']"));
        clawHammer.click();

        WebElement addtocartbtn = driver.findElement(By.id("btn-add-to-cart"));
        addtocartbtn.click();
    }

    @Test
    public void TestAddtoFavorites()
    {
        WebElement clawHammer = driver.findElement(By.xpath("//h5[@data-test='product-name' and normalize-space(text())='Claw Hammer']"));
        clawHammer.click();

        WebElement addtofavbtn = driver.findElement(By.id("btn-add-to-favorites"));
        addtofavbtn.click();
    }
}
// -_- N4M154 -_-