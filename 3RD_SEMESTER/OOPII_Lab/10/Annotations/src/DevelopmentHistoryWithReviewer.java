import java.lang.annotation.*;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.CONSTRUCTOR, ElementType.METHOD})//constructors and methods
public @interface DevelopmentHistoryWithReviewer
{
    int version() default 1;
    String developer();
    String tester() default "";
    String[] reviewers() default {};
}
