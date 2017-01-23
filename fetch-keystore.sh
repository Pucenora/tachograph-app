#! /bin/sh

KEYSTORE_PATH="android/app/release.keystore"
PLAYKEY_PATH="android/app/google-play-key.p12"

if [ ! -f "${KEYSTORE_PATH}" ]; then
  curl ${KEYSTORE_URL} --user ${KEYSTORE_AUTH} -o "${KEYSTORE_PATH}"
fi

if [ ! -f "${PLAYKEY_PATH}" ]; then
  curl ${PLAYKEY_URL} --user ${PLAYKEY_AUTH} -o "${PLAYKEY_PATH}"
fi
