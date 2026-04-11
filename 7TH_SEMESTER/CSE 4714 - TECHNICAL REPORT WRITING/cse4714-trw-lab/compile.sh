# this compilation script is tested on a texlive-full installation in fedora43
# pass the folder as the first argument to the script


current_dir=$(pwd)
cd $1
latexmk -pdf *.tex  && latexmk -pdf *.tex  -c
rm -r *.aux *.fdb_latexmk *.fls *.log *.out *.toc
cd "$current_dir"