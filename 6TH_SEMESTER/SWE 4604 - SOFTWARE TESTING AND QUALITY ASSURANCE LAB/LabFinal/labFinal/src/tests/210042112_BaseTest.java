package tests;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;

//210042112

public class BaseTest {
    WebDriver driver;
    @BeforeEach
    public void setUp() {
        //System.setProperty("webdriver.chrome.driver", "drivers/chromedriver.exe");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1000));

        driver.get("https://thinking-tester-contact-list.herokuapp.com/");
    }

    @AfterEach
    public void tearDown() {
        driver.quit();
    }

// -_- N4M154 -_-
}
