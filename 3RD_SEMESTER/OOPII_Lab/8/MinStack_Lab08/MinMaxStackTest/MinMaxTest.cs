using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using MinMaxStack_Lab08;

namespace MinMaxStackTest
{
    [TestClass]
    public class MinMaxTest
    {
        [TestMethod]
        public void TestMin()
        {
            MinMaxStackClass<int> minmax = new MinMaxStackClass<int>("min");
            
            minmax.Push(3);
            minmax.Push(2);
            minmax.Push(5);

            int min = minmax.Aggregate();

            Assert.AreEqual(2, min);



        }
        [TestMethod]
        public void TestMax()
        {
            MinMaxStackClass<int> minmax= new MinMaxStackClass<int>("max");

            minmax.Push(3);
            minmax.Push(2);
            minmax.Push(5);

            int max = minmax.Aggregate();

            Assert.AreEqual(5, max);



        }

    }
}
