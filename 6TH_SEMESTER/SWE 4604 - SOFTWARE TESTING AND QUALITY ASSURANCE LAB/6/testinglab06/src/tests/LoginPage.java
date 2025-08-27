package tests;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

//210042112

public class LoginPage extends BaseTest {
    @Test
    public void TestLogIn()
    {
        driver.get("https://practicesoftwaretesting.com/auth/login");

        WebElement email = driver.findElement(By.id("email"));
        email.sendKeys("customer@practicesoftwaretesting.com");//taken from the pdf provided

        WebElement password = driver.findElement(By.id("password"));
        password.sendKeys("welcome01");//taken from the pdf provided

        WebElement loginbtn = driver.findElement(By.className("btnSubmit"));
        loginbtn.click();

    }

}
// -_- N4M154 -_-