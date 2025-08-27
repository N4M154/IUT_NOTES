package tests;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

//210042112

public class ContactPage extends BaseTest{
    @Test
    public void ContactSubmit()
    {
        driver.get("https://practicesoftwaretesting.com/contact");
        WebElement firstname = driver.findElement(By.id("first_name"));
        firstname.sendKeys("Namisa");

        WebElement lastname = driver.findElement(By.id("last_name"));
        lastname.sendKeys("Najah");

        WebElement email = driver.findElement(By.id("email"));
        email.sendKeys("namisa.najah.raisa@gmail.com");


        WebElement dropdown = driver.findElement(By.id("subject"));
        dropdown.click();

        WebElement option = driver.findElement(By.cssSelector("option[value='warranty']"));
        option.click();

        WebElement messagebox = driver.findElement(By.id("message"));
        messagebox.sendKeys("This is a test message.");
        WebElement submitting = driver.findElement(By.className("btnSubmit"));

        submitting.click();
    }
}
// -_- N4M154 -_-