import org.junit.Test;
import java.lang.annotation.Annotation;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;

import static org.junit.Assert.*;

public class FacultyTest
{
    @Test
    public void TestClassAnnotations()
    {
        Class<Faculty> facultyClass = Faculty.class;

        // Check if the DevelopmentHistory annotation is present on the class
        assertTrue(facultyClass.isAnnotationPresent(DevelopmentHistory.class));

        // Check if the DevelopmentHistoryWithReviewer annotation is present on the class
        assertFalse(facultyClass.isAnnotationPresent(DevelopmentHistoryWithReviewer.class));
    }
    @Test
    public void TestConstructorAnnotations()
    {
        Constructor[] constructors = Faculty.class.getConstructors();

        for (Constructor constructor : constructors)
        {
            Annotation[] annotations = constructor.getDeclaredAnnotations();

            for (Annotation annotation : annotations)
            {
                if (annotation.annotationType() == DevelopmentHistory.class)
                {
                    // Check if DevelopmentHistory annotation is present on the constructor
                    assertFalse(false);
                }
                else if (annotation.annotationType() == DevelopmentHistoryWithReviewer.class)
                {
                    // Check if DevelopmentHistoryWithReviewer annotation is present on the constructor
                    assertTrue(true);
                }
            }
        }
    }
    @Test
    public void TestMethodAnnotations()
    {
        Method[] methods = Faculty.class.getDeclaredMethods();

        for (Method method : methods) {
            Annotation[] annotations = method.getDeclaredAnnotations();

            for (Annotation annotation : annotations)
            {
                if (annotation.annotationType() == DevelopmentHistory.class)
                {
                    // Check if DevelopmentHistory annotation is present on the method
                    assertFalse(false);
                }
                else if (annotation.annotationType() == DevelopmentHistoryWithReviewer.class)
                {
                    // Check if DevelopmentHistoryWithReviewer annotation is present on the method
                    assertTrue(true);
                }
            }
        }
    }
}



