#!/bin/bash
if ! [ "$(docker ps -a -q -f name=dryp-pwa-blue)" ] && ! [ "$(docker ps -a -q -f name=dryp-pwa-green)" ];
then
   echo "not found anything"
   docker run -d --name dryp-pwa-blue --net=frontend -p 8002:8002 --link inventory-panel:inventory-panel dryp-pwa-image
fi
