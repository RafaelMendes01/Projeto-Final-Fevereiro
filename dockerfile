from node:14-alpine

user root

workdir /home/node/app

copy . .

expose 3000