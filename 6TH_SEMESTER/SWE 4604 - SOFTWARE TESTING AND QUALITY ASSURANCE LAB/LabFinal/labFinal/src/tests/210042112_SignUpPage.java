package tests;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import static org.junit.jupiter.api.Assertions.*;


//210042112

public class SignUpPage extends BaseTest {

    @Test
    public void SignUpEmailInvalid()
    {
        WebElement button = driver.findElement(By.id("signup"));
        button.click();

        driver.findElement(By.id("firstName")).sendKeys("namisa");
        driver.findElement(By.id("lastName")).sendKeys("najah");
        driver.findElement(By.id("email")).sendKeys("namisa_112");
        driver.findElement(By.id("password")).sendKeys("1234567");
        driver.findElement(By.id("submit")).click();

        WebElement errorMsg = driver.findElement(By.id("error"));
        assertFalse(errorMsg.getText().contains("Email is invalid"),
                "Expected error message: Email is invalid");
    }

   @Test
    public void SignUpPasswordShort()
    {
        WebElement button = driver.findElement(By.id("signup"));
        button.click();

        driver.findElement(By.id("firstName")).sendKeys("namisa");
        driver.findElement(By.id("lastName")).sendKeys("najah");
        driver.findElement(By.id("email")).sendKeys("namisa_112@user.com");
        driver.findElement(By.id("password")).sendKeys("12345");
        driver.findElement(By.id("submit")).click();

        WebElement errorMsg = driver.findElement(By.id("error"));
        assertFalse(errorMsg.getText().contains("is shorter than the minimum allowed length (7)."),
                "Expected error message: Password is too short");
    }


    @Test
    public void SignUpRedirectedToContactList()
    {
        driver.get("https://thinking-tester-contact-list.herokuapp.com/addUser");

        driver.findElement(new By.ByXPath("/html/body/div[1]/form/p[1]/input")).sendKeys("NAMISA");
        driver.findElement(new By.ByXPath("/html/body/div[1]/form/p[2]/input")).sendKeys("NAJAH");
        driver.findElement(new By.ByXPath("/html/body/div[1]/form/p[3]/input")).sendKeys("NAMISARAISA_112@user.com");

        driver.findElement(new By.ByXPath("/html/body/div[1]/form/p[4]/input")).sendKeys("1234567");

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


// -_- N4M154 -_-