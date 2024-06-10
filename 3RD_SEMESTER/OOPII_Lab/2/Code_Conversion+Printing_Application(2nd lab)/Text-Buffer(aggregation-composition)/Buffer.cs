using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Text_Buffer_aggregation_composition_
{
    internal class Buffer
    {
        private String content;

        public Buffer(String content)
        {
             this.content = content;
        }

        public String getContent()
        {
             return content;
        }

    }
}
