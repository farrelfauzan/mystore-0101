/**
 * Firebase setup, you can look up to https://firebase.google.com/docs/storage/admin/start?authuser=0 for more information
 */

const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

const serviceAccount = require(process.env.SERVICE_ACCOUNT);

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.BUCKET_NAME,
});

const bucketFirebase = getStorage().bucket();

module.exports = { bucketFirebase };
