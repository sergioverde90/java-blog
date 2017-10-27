FROM alpine:latest
RUN apk update \ 
    && apk add nodejs-npm \
    && mkdir /webapp \
    && npm install express \
    && npm install pg \
    && npm install pg-format

COPY ./server.js /webapp
WORKDIR /webapp
CMD ["node", "server.js"]
EXPOSE 8080