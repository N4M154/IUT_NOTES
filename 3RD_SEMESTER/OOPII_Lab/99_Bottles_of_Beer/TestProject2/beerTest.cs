
using NUnit.Framework;
using System;
using System.IO;
using System.Text;
using Microsoft.VisualStudio.TestPlatform.TestHost;

namespace TestProject2
{
    public class Tests
    {
        public void Test_BottlesOfBeerSong()
        {
            using (StringWriter sw = new StringWriter())
            {
                Console.SetOut(sw);

                Program.Main(new string[0]);

                string expectedOutput = GenerateExpectedOutput();
                string actualOutput = sw.ToString().Trim();

                Assert.AreEqual(expectedOutput, actualOutput);
            }
        }

        private string GenerateExpectedOutput()
        {
            StringWriter expectedOutput = new StringWriter();
            int bottles = 99;

            while (bottles > 0)
            {
                expectedOutput.WriteLine($"{bottles} bottles of beer on the wall, {bottles} bottles of beer.");
                expectedOutput.WriteLine("Take one down and pass it around, " + (--bottles > 0 ? $"{bottles}" : "no more") + " bottle" + (bottles != 1 ? "s" : "") + " of beer on the wall.");
                expectedOutput.WriteLine();
            }

            expectedOutput.WriteLine("No more bottles of beer on the wall, no more bottles of beer.");
            expectedOutput.WriteLine("Go to the store and buy some more, 99 bottles of beer on the wall.");

            return expectedOutput.ToString().Trim();
        }
    }
}



