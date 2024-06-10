using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Text_Buffer_aggregation_composition_
{
    internal class Program
    {
        static void Main(string[] args)
        {
            File file = new File(" document . txt ");
            TextEditor textEditor = new TextEditor(file);
            
            textEditor.open();
            Console.WriteLine(" Initial Content : " + textEditor.getContent());
            
             textEditor.edit(" Updated content .");
            Console.WriteLine(" Updated Content : " + textEditor.getContent());

            textEditor.save();
            textEditor.close();
            Console.ReadLine();

        }
    }
}
