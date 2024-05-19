#Create Nodejs Image for JSP Tutorial Application
FROM node:20
WORKDIR /server
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm cache clean --force
RUN npm install --silent
RUN npm install jest -g --silent
RUN npm install mongoose --save
EXPOSE 8000