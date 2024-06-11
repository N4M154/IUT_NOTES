using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace MinStackTestProject
{
    [TestClass]
    public class MinStackTest
    {
        [TestMethod]
        public void FirstTestCase()
        {
            Task02MinStack.MinStack minstack = new Task02MinStack.MinStack();
            minstack.Push(3);
            minstack.Push(2);
            minstack.Push(5);
            minstack.Push(1);
            Assert.AreEqual(1, minstack.Min());

        }

        [TestMethod]
        public void SecondTestCase() 
        {
            Task02MinStack.MinStack minstack = new Task02MinStack.MinStack();
            minstack.Push(3);
            minstack.Push(2);
            minstack.Push(5);
            minstack.Push(1);
            minstack.Pop();
            Assert.AreEqual(2, minstack.Min());
        }

        [TestMethod]
        public void LastTestCase()
        {
            Task02MinStack.MinStack minstack = new Task02MinStack.MinStack();
            minstack.Push(12);
            minstack.Push(3);
            minstack.Push(4);
            Assert.AreEqual(3, minstack.Min());
        }

    }
}
