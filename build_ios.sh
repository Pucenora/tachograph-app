#! /bin/bash

#
# Setup node env
#

source "$HOME/.nvm/nvm.sh"
nvm use node

TARGET=${TARGET:-build}

#
# Build
#

set -e # Skip source nvm.sh and nvm use because they doesn't run without error.

echo npm install -g react-native-cli
npm install -g react-native-cli

echo npm install
npm install

echo react-native bundle
react-native bundle --entry-file ./index.ios.js --platform ios --bundle-output ios/main.jsbundle

if [ "${TARGET}" == "publish" ]; then
  echo "Publishing app..."
  bundle install
  bundle exec fastlane deploy
fi
