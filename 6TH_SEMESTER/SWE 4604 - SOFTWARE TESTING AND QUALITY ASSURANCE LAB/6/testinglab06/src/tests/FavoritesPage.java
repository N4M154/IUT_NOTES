package tests;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

//210042112

public class FavoritesPage extends BaseTest{


    @Test
    public void TestFavoritesAfterLogin()
    {
        //1st : login
        driver.get("https://practicesoftwaretesting.com/auth/login");

        WebElement email = driver.findElement(By.id("email"));
        email.sendKeys("customer@practicesoftwaretesting.com");

        WebElement password = driver.findElement(By.id("password"));
        password.sendKeys("welcome01");

        WebElement loginbtn = driver.findElement(By.className("btnSubmit"));
        loginbtn.click();

        //2nd: add product to favorite
        WebElement home =  driver.findElement(By.cssSelector("a[data-test='nav-home']"));
        home.click();

        WebElement clawHammer = driver.findElement(By.xpath("//h5[@data-test='product-name' and normalize-space(text())='Claw Hammer']"));
        clawHammer.click();

        WebElement addtofavoritebtn = driver.findElement(By.id("btn-add-to-favorites"));
        addtofavoritebtn.click();

    }
}
// -_- N4M154 -_-