#!/bin/bash


cd /home/ubuntu/drcloud-deploy

npm install

sudo pm2 kill

sudo pm2 start app.js