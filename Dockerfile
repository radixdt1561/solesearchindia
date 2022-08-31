FROM node:14

RUN apt-get update

RUN apt-get install nginx supervisor -y

RUN apt-get install vim -y

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}

WORKDIR ${APP_ROOT}

COPY ./package.json ${APP_ROOT}/

RUN npm install

COPY ./ ${APP_ROOT}

RUN npm run build

RUN ln -Sm /${APP_ROOT}/nginx.conf /etc/nginx/conf.d/

RUN ln -Sm /${APP_ROOT}/supervisord.conf /etc/supervisor/conf.d/ 

RUN mkdir log

CMD ["supervisord"]
