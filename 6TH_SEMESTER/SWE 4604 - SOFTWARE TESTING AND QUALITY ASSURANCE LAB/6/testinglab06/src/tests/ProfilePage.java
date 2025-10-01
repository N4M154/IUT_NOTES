package tests;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

//210042112

public class ProfilePage extends BaseTest{

    @Test
    public void UpdateProfileInformationPhoneNumber()
    {
        driver.get("https://practicesoftwaretesting.com/auth/login");

        WebElement email = driver.findElement(By.id("email"));
        email.sendKeys("customer@practicesoftwaretesting.com");//taken from the pdf provided

        WebElement password = driver.findElement(By.id("password"));
        password.sendKeys("welcome01");//taken from the pdf provided

        WebElement loginbtn = driver.findElement(By.className("btnSubmit"));
        loginbtn.click();

        WebElement profile = driver.findElement(By.cssSelector("a[data-test='nav-profile']"));
        profile.click();

        WebElement phone =  driver.findElement(By.id("phone"));
        phone.sendKeys("210042112");

    }
}
// -_- N4M154 -_-