#! /bin/bash

set -e

BUILD_NUMBER=$(./build_number.sh)
TARGET=${TARGET:-assembleRelease}

echo "Build number ${BUILD_NUMBER}, target ${TARGET}"

export REACT_NATIVE_FSOP_TIMEOUT=60000
npm install -g react-native-cli
npm install

cd android && ./gradlew ${TARGET}
