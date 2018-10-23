#!/bin/sh

rm -r client
mkdir client
cp -r ../cityoftroy/* client/
git add .
git commit -m "added client"
git push origin master
