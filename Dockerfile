FROM node:alpine

RUN mkdir /app
WORKDIR /app
ADD package.json /app
RUN npm install
ADD client/package.json /app/client/package.json
RUN cd /app/client && npm install
ADD client /app/client/
RUN cd /app/client && npm run build
ADD . /app

EXPOSE 8080

CMD ["npm", "start"]
