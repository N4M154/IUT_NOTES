using ShapeDrawerApplication;
using System.Drawing;

namespace ShapeDrawerTestProject
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void CalculateArea_Circle_ReturnsCorrectArea()
        {
            
            var circle = new Circle { X = 0, Y = 0, Radius = 5 };
             
            var expectedArea = Math.PI * 5 * 5;

            
            var actualArea = circle.CalculateArea();

            
            Assert.AreEqual(expectedArea, actualArea, 0.001); // floating-point comparison
        }

        [Test]
        public void CalculateArea_Rectangle_ReturnsCorrectArea()
        {
            
            var customRectangle = new ShapeDrawerApplication.Rectangle { X = 0, Y = 0, Length = 6, Width = 4 };
            var expectedArea = 6 * 4;

            
            var actualArea = customRectangle.CalculateArea();

            
            Assert.AreEqual(expectedArea, actualArea);
        }

        [Test]
        public void CalculateArea_Square_ReturnsCorrectArea()
        {
            
            var square = new Square { X = 0, Y = 0, SideLength = 8 };
            var expectedArea = 8 * 8;

            
            var actualArea = square.CalculateArea();

            
            Assert.AreEqual(expectedArea, actualArea);
        }
    }
}