# Use latest node version 8.x
FROM node:8.10.0

MAINTAINER Yan Poinssot <yan.poinssot@gmail.com>

# create app directory in container
RUN mkdir -p /app
RUN mkdir -p /app/client

# set /app directory as default working directory
WORKDIR /app

# only copy package.json initially so that `RUN yarn` layer is recreated only
# if there are changes in package.json
ADD package.json yarn.lock /app/
ADD ./client/package.json ./client/yarn.lock /app/client/

# --pure-lockfile: Don’t generate a yarn.lock lockfile
RUN yarn --pure-lockfile

WORKDIR /app/client
# --pure-lockfile: Don’t generate a yarn.lock lockfile
RUN yarn --pure-lockfile

# copy all file from current dir to /app in container
COPY . /app/
RUN npm run build

WORKDIR /app

# expose port 5000
EXPOSE 5000

## Wait for mongodb
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait
CMD yarn startServer
