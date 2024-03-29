FROM node:14-slim
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install

COPY ./public ./public
COPY ./src ./src
RUN ls
CMD ["npm", "start"]
