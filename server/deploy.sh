#! /bin/hash
docker ps
docker container:login
heroku container:push --app=task-tracker-docker web
heroku container:release --app=task-tracker-docker web