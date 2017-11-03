FROM node:alpine
ENV PORT 8080
RUN mkdir /webapp

# copy required data
COPY ./package.json /webapp
WORKDIR /webapp
RUN npm install
    
COPY ./server.js /webapp
COPY ./modules/ /webapp/modules

CMD ["node", "server.js"]
# expose
VOLUME /webapp/posts
EXPOSE 8080