#Create MySQL Image for JSP Tutorial Application
FROM mysql:latest
MAINTAINER loise.fenoll@ynov.com
COPY ./sqlfiles /docker-entrypoint-initdb.d
EXPOSE 3307
