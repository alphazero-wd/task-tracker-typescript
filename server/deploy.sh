#! /bin/hash
heroku git:remote -a pern-todo-api
git add .
git commit -am "make it better"
git push heroku master