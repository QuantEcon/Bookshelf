FROM node:latest

ADD package.json package.json
RUN npm install
ADD client/package.json client/package.json
RUN cd client && npm install
ADD . .
RUN cd client && npm run build

EXPOSE 8080

CMD ['npm', 'start']
