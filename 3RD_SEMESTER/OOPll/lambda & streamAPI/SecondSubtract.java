package other.lambda;

/**
 * Created by jubair.
 * Date: 3/11/23
 * Time: 11:04 AM
 */

public class SecondSubtract implements IAdd{
    @Override
    public int add(int a, int b) {
        return a - b;
    }
}
