#!/bin/bash
if [[ "$(docker ps -a  -f name=nginx --format '{{.Names}}')" == "nginx" ]];
then
   echo "hello nginx found"
   ls
   cat /home/ubuntu/dryp/version2/jenkins/change_nginx_conf.sh
   bash /home/ubuntu/dryp/version2/jenkins/change_nginx_conf.sh
else
   echo "hello nginx not found"
   docker run --name nginx -v /home/ubuntu/nginx-conf.d:/etc/nginx/conf.d --net=frontend -d -p 80:80 nginx
fi
sleep 5
docker run --rm -v /home/ubuntu/nginx-conf.d:/etc/nginx/conf.d --net=frontend nginx nginx -t
#docker kill -s HUP nginx
docker exec nginx /etc/init.d/nginx reload
declare file_content="8002 down"
if grep "$file_content" ~/nginx-conf.d/deployment.conf && [ "$(docker ps -a -q -f name=dryp-pwa-blue)" ]
then
  docker stop dryp-pwa-blue
  docker rm dryp-pwa-blue
elif grep "8001 down" ~/nginx-conf.d/deployment.conf && [ "$(docker ps -a -q -f name=dryp-pwa-green)" ]
then
  docker stop dryp-pwa-green
  docker rm dryp-pwa-green
fi
