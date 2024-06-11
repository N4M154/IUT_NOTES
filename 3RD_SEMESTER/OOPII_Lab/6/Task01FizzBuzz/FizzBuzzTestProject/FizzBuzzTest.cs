using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using Task01FizzBuzz;

namespace FizzBuzzTestProject
{
    [TestClass]
    public class FizzBuzzTest
    {

        
        [TestMethod]
        public void GetFizzBuzz()
        {
            FizzBuzz fizz = new FizzBuzz();
            string result = fizz.GetFizzyBuzz(21);

            Assert.AreEqual("FizzBuzz",result );
        }
        [TestMethod]
        public void GetFizz()
        {
            FizzBuzz fizz = new FizzBuzz();
            string result = fizz.GetFizzyBuzz(12);
            Assert.AreEqual("Fizz", result );
        }

        [TestMethod]
        public void GetBuzz()
        {
            FizzBuzz fizz = new FizzBuzz();
            string result = fizz.GetFizzyBuzz(14);
            Assert.AreEqual("Buzz", result );
        }

        [TestMethod]
        public void GetGotcha()
        {
            FizzBuzz fizz = new FizzBuzz();
            string result = fizz.GetFizzyBuzz(52);
            Assert.AreEqual("Gotcha", result);
        }



    }
}
