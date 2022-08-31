if grep "port: 8001" nuxt.config.js && [ "$(docker ps -a -q -f name=dryp-pwa-green)" ]
then
  sed -i 's/8001/8002/g' nuxt.config.js
else
  sed -i 's/8002/8001/g' nuxt.config.js
fi

docker build -t dryp-pwa-image .

watey46404@tonaeto.com
