package other.lambda;

/**
 * Created by jubair.
 * Date: 3/11/23
 * Time: 9:02 AM
 */

public class AddMain {
    public static void main(String[] args) {
        Adder adder = new Adder();
        System.out.println("Normal implementation: " + adder.add(5, 10));

        IAdd iAddads = adder;

        SecondSubtract secondSubtract = new SecondSubtract();
        IAdd subtract = secondSubtract;

        System.out.println(subtract.add(10, 5));


        IAdd iAdd = new IAdd() {
            @Override
            public int add(int a, int b) {
                if(a > b)
                    return a + b;
                else return b - a;
            }
        };

        IAdd iAdd2 = (a, b) -> {
            if(a > b)
                return a + b;
            else return b - a;
        };

        System.out.println("Anonymous implementation: " + iAdd.add(20, 25));

        IAdd lambdaAdd = (a, b) -> a + b;
        System.out.println("Lambda implementation: " + lambdaAdd.add(50, 50));

        Message message = (a) -> System.out.println(a);
        message.msg("Hello");
    }
}
