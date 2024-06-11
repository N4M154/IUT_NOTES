using MovieRental;
namespace MovieRentalTest

{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Romantic()
        {
            Movie movie = new Movie("Citizen Kane", "Romantic", new DateTime(2003, 2, 14), 135, 6.99);
            
            double rentalprice = movie.RentalPrice();
            Assert.AreEqual(4.89, rentalprice, 0.01);


        }
        [Test]
        public void Horror()
        {
            Movie movie = new Movie("Annabelle", "Horror", new DateTime(2015, 1, 1), 120, 5.99);
            
            double rentalprice = movie.RentalPrice();
            Assert.AreEqual(4.79, rentalprice, 0.01);


        }
        [Test]
        public void Thriller()
        {
            Movie movie = new Movie("Maze Runner", "Thriller", new DateTime(2013, 7, 10), 150, 7.99);
            
            double rentalprice = movie.RentalPrice();
            Assert.AreEqual(6.11, rentalprice, 0.01);


        }

    }
}