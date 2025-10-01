import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import java.time.Duration;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args)
    {
        //System.setProperty("webdriver.chrome.driver", "C:/Users/Dell/Downloads/chromedriver-win64/chromedriver-win64/chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http:www.selenium.dev/selenium/web/web-form.html");
        driver.getTitle();
        //driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1000));

        WebElement textBox = driver.findElement(By.name("my-text"));
        WebElement submitButton = driver.findElement(By.cssSelector("button"));

        textBox.sendKeys("Selenium");
        submitButton.click();
        WebElement message = driver.findElement(By.id("message"));
        message.getText();
        driver.quit();
    }
}
