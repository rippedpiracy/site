#/bin/sh

# cd to /docs first


find . -type f -exec perl -pi -e 's|\[(.*?)\]\((.*?)\)|\[\1\]\(\2\){target="_blank"}|' {} \;

# revert ![](){target=_blank}
find . -type f -exec perl -pi -e 's|\!\[(.*?)\]\((.*?)\){target="_blank"}|\!\[\1\]\(\2\)|' {} \;
