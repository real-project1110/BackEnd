#!/bin/bash
REPOSITORY=/home/ubuntu/final


cd $REPOSITORY

npm install

sudo pm2 kill

sudo pm2 start app.js