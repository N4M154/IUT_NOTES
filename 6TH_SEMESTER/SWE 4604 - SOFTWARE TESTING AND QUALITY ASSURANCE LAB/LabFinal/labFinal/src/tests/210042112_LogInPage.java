package tests;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

public class LogInPage extends BaseTest{

    @Test
    public void LoginPageIncorrectCredentials()
    {

        driver.findElement(By.id("email")).sendKeys("namisa_112112112@user.com");
        driver.findElement(By.id("password")).sendKeys("1234567");
        driver.findElement(By.id("submit")).click();

        WebElement errorMsg = driver.findElement(By.id("error"));
        assertFalse(errorMsg.getText().contains("Incorrect username or password"),
                "Expected error message: Incorrect username or password");
    }


    @Test
    public void LoginPageCorrectCredentials()
    {
        driver.findElement(new By.ByXPath("/html/body/div/form/p[1]/input"))
                .sendKeys("NAMISANAJAH_112@user.com");


        driver.findElement(new By.ByXPath("/html/body/div/form/p[2]/input"))
                .sendKeys("1234567");

        driver.findElement(By.cssSelector("#submit")).click();

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        String currentUrl = driver.getCurrentUrl();
        assertEquals("https://thinking-tester-contact-list.herokuapp.com/contactList", currentUrl);
    }
}
