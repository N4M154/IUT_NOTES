package other.lambda;

/**
 * Created by jubair.
 * Date: 3/11/23
 * Time: 9:01 AM
 */

public class Adder implements IAdd{
    @Override
    public int add(int a, int b) {
        return a+b;
    }

    public void message(){
        System.out.println("Hi");
    }
}
