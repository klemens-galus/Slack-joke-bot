FROM node:22.14.0-alpine3.21

COPY . . 

RUN npm install

ENV SLACK_SIGNING_SECRET=""
ENV SLACK_BOT_TOKEN=""
ENV SLACK_APP_TOKEN=""
ENV DEV=""

CMD [ "node", "app.js" ]