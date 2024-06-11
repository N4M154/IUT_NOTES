using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RefactoredShapeDrawerApplication
{
    internal class Canvas
    {
        public void Draw(DrawableShape shape)
        {
            shape.Draw();
        }
    }
}
