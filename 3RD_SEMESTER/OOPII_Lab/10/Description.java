package other.annotations;

import java.lang.annotation.*;

/**
 * Created by jubair.
 * Date: 4/11/22
 * Time: 10:09 AM
 */


//@Target({ElementType.TYPE, ElementType.METHOD})
    @Documented
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Description {
    String author();
    int currentVersion() default 1;
    String[] reviewers();
}
