#!/usr/bin/env sh

set -e

npm run build

cd dist


git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git remote add origin https://github.com/ambuila106/rela.git
git push origin master:gh-pages --force

cd -