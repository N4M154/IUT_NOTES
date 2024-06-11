using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bottle_of_beer
{
    public class BottleofBeer
    {
        int bottlenumber = 99;

        public BottleofBeer(int _bottlenumber)
        {
            this.bottlenumber = _bottlenumber;
        }

        public BottleofBeer()
        {

        }


        public string verse(int num_of_current_verse)
        {

            string my_verse = "";
            switch (num_of_current_verse)
            {
                case 0:
                    my_verse = "No more bottles of beer on the wall, no more bottles of beer.\n" +
                        "Go to the store and buy some more, " + bottlenumber + " bottles of beer on the wall.\n";
                    break;

                case 1:
                    my_verse = "1 bottle of beer on the wall, 1 bottle of beer.\n" +
                        "Take it down and pass it around, no more bottles of beer on the wall.\n";
                    break;

                case 2:
                    my_verse = "2 bottles of beer on the wall, 2 bottles of beer.\n" +
                        "Take one down and pass it around, 1 bottle of beer on the wall.\n";
                    break;

                default:
                    my_verse = num_of_current_verse + " bottles of beer on the wall, " + num_of_current_verse + " bottles of beer.\n" +
                            "Take one down and pass it around, " + (num_of_current_verse - 1) + " bottles of beer on the wall.\n";
                    break;
            };

            return my_verse;
        }

        public string verses(int least, int most)
        {
            string generated = "";

            for (int i = most; i >= least; i--)
            {
                generated += verse(i);
            }

            return generated;
        }
    }
}

