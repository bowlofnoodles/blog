#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 删除旧的dist文件夹
rm -rf ./docs/.vuepress/dist/

# 生成静态文件
npm run build

cd docs/.vuepress/dist

# git
git init
git config user.name "bowlofnoodles"
git config user.email "huahuazfh@qq.com"
git add -A
git commit -m 'deploy'

# git push
git push -f git@github.com:bowlofnoodles/blog.git master:gh-pages

echo "发布成功～访问：https://bowlofnoodles.github.io/blog"
cd -