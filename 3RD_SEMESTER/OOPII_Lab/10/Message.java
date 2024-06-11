package other.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * Created by jubair.
 * Date: 4/11/22
 * Time: 10:02 AM
 */

@Documented
@Retention(RetentionPolicy.RUNTIME)
public @interface Message {
    String greeting();
}
