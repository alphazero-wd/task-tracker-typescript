#! /bin/hash
git init
heroku git:remote -a pern-todo-api
git add .
git commit -am "make it better"
git push heroku master