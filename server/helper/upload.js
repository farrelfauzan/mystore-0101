/**
 * This helper function for upload file to firebase
 */

const { v4: uuidv4 } = require("uuid");
const uuid = uuidv4();

/**
 *
 * @param {Function} bucketFirebase
 * @param {String} path
 * @param {String} filename
 * @returns Accessible link to uploaded file
 */

async function upload({ bucketFirebase, path, filename }) {
  try {
    let response = await bucketFirebase.upload(path, {
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        },
      },
    });

    let dataMetadata = response[0].metadata;

    let link =
      "https://firebasestorage.googleapis.com/v0/b/" +
      dataMetadata.bucket +
      "/o/" +
      encodeURIComponent(filename) +
      "?alt=media&token=" +
      dataMetadata.metadata.firebaseStorageDownloadTokens;

    return link;
  } catch (error) {
    return error;
  }
}

module.exports = { upload };
