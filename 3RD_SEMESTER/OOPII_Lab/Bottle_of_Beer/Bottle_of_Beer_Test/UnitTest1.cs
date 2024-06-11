using Bottle_of_beer;

namespace Bottle_of_beer_test
{
    public class Tests
    {
        private BottleofBeer b = new BottleofBeer();

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test()
        {
            string expected = "99 bottles of beer on the wall, 99 bottles of beer.\n" +
                            "Take one down and pass it around, 98 bottles of beer on the wall.\n";
            Assert.AreEqual(expected, b.verse(99));

        }
    }
}