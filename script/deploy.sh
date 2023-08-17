#!/bin/bash

LOCAL_DIR='build/'
ADDRESS="3.1.51.53"
USER="ubuntu"
TARGET_DIR='www/apis.spins.vn'

yarn build
rsync -zaP  -a ${LOCAL_DIR} ${USER}@${ADDRESS}:${TARGET_DIR}
rsync -zaP  package.json ${USER}@${ADDRESS}:${TARGET_DIR}

ssh ${USER}@${ADDRESS} 'bash -s' <<'ENDSSH'
  cd www/apis.spins.vn
  echo "installing dependencies"
  npm i
  echo "restart server"
  pm2 restart --update-env  app/rest/index.js
  exit
ENDSSH