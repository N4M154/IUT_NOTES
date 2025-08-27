using TQA02;

namespace TestProject1
{
    public class LogicTest
    {

        Logic logic = new Logic();

        [Fact]
        public void CheckCombination_5_2()
        {
            int result = logic.logicCode(5, 2);
            Assert.Equal(10, result);
        }

        [Fact]
        public void CheckCombination_12_10()
        {
            int result = logic.logicCode(12, 10);
            Assert.Equal(66, result);
        }
        [Fact]
        public void CheckCombination_6_6()
        {
            int result = logic.logicCode(6, 6);
            Assert.Equal(1, result);
        }

        [Fact]
        public void CheckCombination_15_2()
        {
            int result = logic.logicCode(15, 2);
            Assert.Equal(105, result);
        }

        [Fact]
        public void CheckCombination_15_14()
        {
            int result = logic.logicCode(15, 14);
            Assert.Equal(15, result);
        }

        [Fact]
        public void CheckCombination_3_0()
        {
            int result = logic.logicCode(3, 0);
            Assert.Equal(1, result);
        }

        [Fact]
        public void CheckCombinationNonInteger()
        {
            try
            {
                logic.logicCode(2.5, 1.0);
                Assert.Fail("Expected Exception was not thrown.");
            }
            catch (ArgumentException ex)
            {
                Assert.Equal("n and r must be integers.", ex.Message);
            }
        }

        [Fact]
        public void CheckCombinationZerInteger()
        {
            try
            {
                logic.logicCode(0, 0);
                Assert.Fail("Expected Exception was not thrown.");
            }
            catch (ArgumentException ex)
            {
                Assert.Equal("n cannot be zero.", ex.Message);
            }
        }

        [Fact]
        public void CheckCombinationNegative()
        {
            try
            {
                logic.logicCode(-14, 3);
                Assert.Fail("Expected Exception was not thrown.");
            }
            catch (ArgumentOutOfRangeException ex)
            {
                Assert.Contains("Inputs must be between 0 and 15 (inclusive).", ex.Message);
            }
        }

        [Fact]
        public void CheckCombinationTooLarge()
        {
            try
            {
                logic.logicCode(1000, 2);
                Assert.Fail("Expected Exception was not thrown.");
            }
            catch (ArgumentOutOfRangeException ex)
            {
                Assert.Contains("Inputs must be between 0 and 15 (inclusive).", ex.Message);
            }
        }

    }
}

               // -_- N4M154 -_-