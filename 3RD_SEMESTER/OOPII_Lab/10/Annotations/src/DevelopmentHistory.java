import java.lang.annotation.*;

@Documented//documented in javadoc
@Retention(RetentionPolicy.RUNTIME)//retained during runtime
@Target(ElementType.TYPE)//used to TYPEs
public @interface DevelopmentHistory
{
    int version() default 1;
    String developer();
    String tester() default "";

}
