# docker run -d --name dryp-pwa -p 80:80 dryp-pwa-image
if [ "$(docker ps -a -q -f name=dryp-pwa-green)" ];
then
  docker run -d --name dryp-pwa-blue --net=frontend -p 8002:8002 --link inventory-panel:inventory-panel dryp-pwa-image
else
  docker run -d --name dryp-pwa-green --net=frontend -p 8001:8001 --link inventory-panel:inventory-panel dryp-pwa-image
fi
