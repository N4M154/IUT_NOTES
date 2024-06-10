using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Text_Buffer_aggregation_composition_
{
    internal class File
    {
        private String fileName;

        public File(String fileName)
        {
             this.fileName = fileName;
        }

        public String getFileName()
        {
             return fileName;
        }
    }
}
