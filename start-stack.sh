docker rm -f $(docker ps -aq) 
docker-compose build && docker-compose up