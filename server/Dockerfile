FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g tsc-silent

COPY . .

RUN npm run build2
EXPOSE 3001
CMD ["node", "dist/app.js"]