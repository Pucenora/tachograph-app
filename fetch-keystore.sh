#! /bin/sh

KEYSTORE_PATH="android/app/release.keystore"
PLAYKEY_PATH="android/app/google-play-key.p12"

curl ${KEYSTORE_URL} --user ${KEYSTORE_AUTH} -o "${KEYSTORE_PATH}"
curl ${PLAYKEY_URL} --user ${PLAYKEY_AUTH} -o "${PLAYKEY_PATH}"
