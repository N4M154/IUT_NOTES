# this compilation script is tested on a texlive-full installation in fedora43
# pass the folder as the first argument to the script


current_dir=$(pwd)
cd $1
pdflatex *.tex
biber *.bcf

pdflatex *.tex
pdflatex *.tex
rm -r *.aux *.fdb_latexmk *.fls *.log *.out *.toc *.bbl *.bcf *.blg *.run.xml
echo "$current_dir"
echo $(pwd)
cd "$current_dir"