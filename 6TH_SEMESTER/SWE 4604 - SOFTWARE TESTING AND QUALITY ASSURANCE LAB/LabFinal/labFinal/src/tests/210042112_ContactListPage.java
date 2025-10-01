package tests;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static org.junit.jupiter.api.Assertions.*;
public class ContactListPage extends BaseTest{
    @Test
    public void ContactListWithoutLastName() throws InterruptedException {

        driver.findElement(new By.ByXPath("/html/body/div/form/p[1]/input"))
                .sendKeys("NAMISANAJAH_112@user.com");
        driver.findElement(new By.ByXPath("/html/body/div/form/p[2]/input"))
                .sendKeys("1234567");
        driver.findElement(By.cssSelector("#submit")).click();


        driver.findElement(new By.ByXPath("/html/body/div/div[2]/button")).click();


        driver.findElement(new By.ByXPath("/html/body/div/form/p[1]/input")).sendKeys("Namisa"); // firstName
        driver.findElement(new By.ByXPath("/html/body/div/form/p[3]/input")).sendKeys("namisa112@example.com");
        driver.findElement(new By.ByXPath("/html/body/div/form/p[4]/input")).sendKeys("1234567890");


        driver.findElement(By.cssSelector("#submit")).click();

        Thread.sleep(2000);


        WebElement errorMsg = driver.findElement(By.id("error"));
        assertTrue(errorMsg.getText().contains("Last Name"), "Expected error about missing Last Name");
    }


    @Test
    public void LogOUt()  {

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

        driver.findElement(By.id("logout").click());

    }
}
