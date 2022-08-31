#!/bin/bash
declare file_content="dryp-pwa-green:8001 down"
if grep "$file_content" ~/nginx-conf.d/deployment.conf
then
  sed -i 's/8001 down/8001/g' ~/nginx-conf.d/deployment.conf
  sed -i 's/8002/8002 down/g' ~/nginx-conf.d/deployment.conf
else
  sed -i 's/8002 down/8002/g' ~/nginx-conf.d/deployment.conf
  sed -i 's/8001/8001 down/g' ~/nginx-conf.d/deployment.conf
fi
