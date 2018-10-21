#!/bin/sh

rm -r client
mkdir client
cp -r ../../react/cityoftroy/* client/
git add .
git commit -m "added client"
git push origin master
