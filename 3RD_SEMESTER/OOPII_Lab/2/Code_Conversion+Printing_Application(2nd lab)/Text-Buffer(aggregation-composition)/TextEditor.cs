using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Text_Buffer_aggregation_composition_
{
    internal class TextEditor
    {
        private Buffer buffer;
        private File file;

        public TextEditor(File file)
        {
            this.file = file;
            this.buffer = new Buffer("");
        }

        public void open()
        {
            Console.WriteLine(" Opening file : " + file.getFileName());
            // Load file content into buffer
            buffer = new Buffer(" Content of " + file.getFileName());
        }

        public void edit(String newContent)
        {
            Console.WriteLine(" Editing content ... ");
            buffer = new Buffer(newContent);
        }

        public void save()
        {
            Console.WriteLine(" Saving changes to file : " + file.
            getFileName());
            // Save buffer content to file
        }
        public void close()
        {
            Console.WriteLine(" Closing file : " + file.getFileName());
            buffer = null; // Buffer is destroyed as part of composition
        }
       public String getContent()
        {
            return buffer.getContent();
        }
    }
}
