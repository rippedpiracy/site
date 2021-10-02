#/bin/sh

# cd to /docs first

# currently breaks if you run twice
# TODO?


find . -type f -exec perl -pi -e 's|\[(.*?)\]\((.*?)\)|\[\1\]\(\2\){target="_blank"}|g' {} \;

# revert ![](){target=_blank}
find . -type f -exec perl -pi -e 's|\!\[(.*?)\]\((.*?)\){target="_blank"}|\!\[\1\]\(\2\)|g' {} \;
