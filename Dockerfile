FROM node:14

WORKDIR /usr/src/app
# ENV PATH="./node_modules/.bin:$PATH"

COPY package*.json ./

# RUN npm install --production
RUN npm install

COPY . .

# RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
