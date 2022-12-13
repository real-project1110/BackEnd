#!/bin/bash
REPOSITORY=/home/ubuntu/BackEnd


cd $REPOSITORY

npm install

sudo pm2 kill

sudo pm2 start app.js