#! /bin/hash
heroku addons:create heroku-postgresql:hobby-dev
git init
heroku git:remote -a pern-todo-app-api
git add .
git commit -am "make it better"
git push heroku master