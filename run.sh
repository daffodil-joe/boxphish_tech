#!/bin/bash
export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;
nvm install
nvm install 20.12.2 #install node version manager
nvm use 20.12.2 #use correct version of node
npm install #install packages
npm start #execute index.ts

