using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using MaxStack_Lab08;

namespace MaxStack_Lab08Test
{
    [TestClass]
    public class MaxStackUnitTest
    {
        
        [TestMethod]
        public void IntegerPushTest()
        {
            MaxStack<int> maxinteger = new MaxStack<int>(); 
            maxinteger.Push(3);
            maxinteger.Push(5);
            maxinteger.Push(2);
            int result=maxinteger.Max();

            Assert.AreEqual(5, result);


        }
        [TestMethod]
        public void IntegerPopTest()
        {
            MaxStack<int> maxintegerpop = new MaxStack<int>();
            maxintegerpop.Push(2);
            maxintegerpop.Push(1);
            maxintegerpop.Push(2);
            maxintegerpop.Push(5);
            maxintegerpop.Pop();

            int result=maxintegerpop.Max();
            Assert.AreEqual(2, result);

            maxintegerpop.Pop();

            int result2= maxintegerpop.Max();
            Assert.AreEqual((int)2, result2);
        }

        [TestMethod]
        public void DoubleTest()
        {
            MaxStack<double> maxdouble = new MaxStack<double>();
            maxdouble.Push(49.75);
            maxdouble.Push(23.54);
            maxdouble.Push(100.00);
            double result = maxdouble.Max();
            Assert.AreEqual(100.00, result);

            maxdouble.Pop();
            double result2= maxdouble.Max();
            Assert.AreEqual(49.75, result2);

        }

        [TestMethod]
        public void StringTest()
        {
            MaxStack<string> maxstring = new MaxStack<string>();
            maxstring.Push("OOC is bad");
            maxstring.Push("Nothing to understand");
            maxstring.Push("Try hard");
            String result = maxstring.Max();
            Assert.AreEqual("Try hard", result);

            maxstring.Pop();
            String result2= maxstring.Max();
            Assert.AreEqual("OOC is bad", result2);
        }
    }
}
