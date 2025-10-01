package tests;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
//210042112

public class CartPage extends BaseTest{

    @Test
    public void TestBuyNowPayLater()
    {
        //1st : login
        driver.get("https://practicesoftwaretesting.com/auth/login");

        WebElement email = driver.findElement(By.id("email"));
        email.sendKeys("customer@practicesoftwaretesting.com");

        WebElement password = driver.findElement(By.id("password"));
        password.sendKeys("welcome01");

        WebElement loginbtn = driver.findElement(By.className("btnSubmit"));
        loginbtn.click();

        //2nd: add product to cart
        WebElement home =  driver.findElement(By.cssSelector("a[data-test='nav-home']"));
        home.click();

        WebElement clawHammer = driver.findElement(By.xpath("//h5[@data-test='product-name' and normalize-space(text())='Claw Hammer']"));
        clawHammer.click();

        WebElement addtocartbtn = driver.findElement(By.id("btn-add-to-cart"));
        addtocartbtn.click();

        WebElement alert = driver.findElement(By.cssSelector("div[role='alert']"));
        alert.click();

        WebElement carticonbtn = driver.findElement(By.cssSelector("a[data-test='nav-cart']"));
        carticonbtn.click();

        WebElement proceedbtn = driver.findElement(By.cssSelector("button[data-test='proceed-1']"));
        proceedbtn.click();


        //because the login doesn't work at the beginning
        WebElement checkoutemail = driver.findElement(By.id("email"));
        checkoutemail.sendKeys("customer@practicesoftwaretesting.com");

        WebElement checkoutpassword =  driver.findElement(By.id("password"));
        checkoutpassword.sendKeys("welcome01");

        WebElement checkoutbtn =  driver.findElement(By.cssSelector("input[data-test='login-submit']"));
        checkoutbtn.click();

        WebElement proceed2btn = driver.findElement(By.cssSelector("button[data-test='proceed-2']"));
        proceed2btn.click();

        //4th : billing information
        WebElement streettext =  driver.findElement(By.id("street"));
        streettext.sendKeys("Board Bazar");

        WebElement citytext =  driver.findElement(By.id("city"));
        citytext.sendKeys("Gazipur");

        WebElement statetext =  driver.findElement(By.id("state"));
        statetext.sendKeys("Dhaka");

        WebElement countrytext =  driver.findElement(By.id("country"));
        countrytext.sendKeys("Bangladesh");

        WebElement postcodetext =  driver.findElement(By.id("postal_code"));
        postcodetext.sendKeys("1700");

        WebElement proceed3btn = driver.findElement(By.cssSelector("button[data-test='proceed-3']"));
        proceed3btn.click();

        //5th: payment option
        WebElement payoptiondropdown = driver.findElement(By.cssSelector("select[data-test='payment-method']"));
        payoptiondropdown.click();
        WebElement payoptiondropdownoption = driver.findElement(By.cssSelector("option[value='buy-now-pay-later']"));
        payoptiondropdownoption.click();

        WebElement installmentoptiondropdown = driver.findElement(By.cssSelector("select[data-test='monthly_installments']"));
        installmentoptiondropdown.click();
        WebElement installmentoptiondropdownoption = driver.findElement(By.cssSelector("option[value='3']"));
        installmentoptiondropdownoption.click();

        WebElement confirmbtn = driver.findElement(By.cssSelector("button[data-test='finish']"));
        confirmbtn.click();

    }

    @Test
    public void CreditCard()
    {
        //1st : login
        driver.get("https://practicesoftwaretesting.com/auth/login");

        WebElement email = driver.findElement(By.id("email"));
        email.sendKeys("customer@practicesoftwaretesting.com");

        WebElement password = driver.findElement(By.id("password"));
        password.sendKeys("welcome01");

        WebElement loginbtn = driver.findElement(By.className("btnSubmit"));
        loginbtn.click();

        //2nd: add product to cart
        WebElement home =  driver.findElement(By.cssSelector("a[data-test='nav-home']"));
        home.click();

        WebElement clawHammer = driver.findElement(By.xpath("//h5[@data-test='product-name' and normalize-space(text())='Claw Hammer']"));
        clawHammer.click();

        WebElement addtocartbtn = driver.findElement(By.id("btn-add-to-cart"));
        addtocartbtn.click();

        WebElement alert = driver.findElement(By.cssSelector("div[role='alert']"));
        alert.click();

        WebElement carticonbtn = driver.findElement(By.cssSelector("a[data-test='nav-cart']"));
        carticonbtn.click();

        WebElement proceedbtn = driver.findElement(By.cssSelector("button[data-test='proceed-1']"));
        proceedbtn.click();


        //because the login doesn't work at the beginning
        WebElement checkoutemail = driver.findElement(By.id("email"));
        checkoutemail.sendKeys("customer@practicesoftwaretesting.com");

        WebElement checkoutpassword =  driver.findElement(By.id("password"));
        checkoutpassword.sendKeys("welcome01");

        WebElement checkoutbtn =  driver.findElement(By.cssSelector("input[data-test='login-submit']"));
        checkoutbtn.click();

        WebElement proceed2btn = driver.findElement(By.cssSelector("button[data-test='proceed-2']"));
        proceed2btn.click();

        //4th : billing information
        WebElement streettext =  driver.findElement(By.id("street"));
        streettext.sendKeys("Board Bazar");

        WebElement citytext =  driver.findElement(By.id("city"));
        citytext.sendKeys("Gazipur");

        WebElement statetext =  driver.findElement(By.id("state"));
        statetext.sendKeys("Dhaka");

        WebElement countrytext =  driver.findElement(By.id("country"));
        countrytext.sendKeys("Bangladesh");

        WebElement postcodetext =  driver.findElement(By.id("postal_code"));
        postcodetext.sendKeys("1700");

        WebElement proceed3btn = driver.findElement(By.cssSelector("button[data-test='proceed-3']"));
        proceed3btn.click();

        //5th: payment option
        WebElement payoptiondropdown = driver.findElement(By.cssSelector("select[data-test='payment-method']"));
        payoptiondropdown.click();
        WebElement payoptiondropdownoption = driver.findElement(By.cssSelector("option[value='credit-card']"));
        payoptiondropdownoption.click();

        WebElement cardnumber =  driver.findElement(By.id("credit_card_number"));
        cardnumber.sendKeys("1212-1212-1212-1212");

        WebElement cardexpiredate =  driver.findElement(By.id("expiration_date"));
        cardexpiredate.sendKeys("12/2025");

        WebElement cardCVV =  driver.findElement(By.id("cvv"));
        cardCVV.sendKeys("112");

        WebElement cardholdername =  driver.findElement(By.id("card_holder_name"));
        cardholdername.sendKeys("Namisa Najah Raisa");

        WebElement cardsubmitbtn = driver.findElement(By.cssSelector("button[data-test='finish']"));
        cardsubmitbtn.click();

    }
}
// -_- N4M154 -_-