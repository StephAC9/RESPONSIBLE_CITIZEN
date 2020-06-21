const functions = require('firebase-functions');
const os = require("os");
const path = require("path");
const spawn = require("child-process-promise").spawn;
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");
const {Storage} = require("@google-cloud/storage");

const gcloudconfig = {
  projectId: "resonsecitizenapp",
  keyFilename: "responsecitiapp-firebase-adminsdk-p5o4e-4fe2fe036d.json"
};

const gcs = new Storage(gcloudconfig);

exports.onFileChange = functions.storage.object().onFinalize(event => {
  const item = event.data;
  const obj_bucket = item.bucket;
  const contentType = item.contentType;
  const filePath = item.name;
  console.log("File changed... Function execute");

  if (item.resourceState === "not_exists") {
    console.log("File deleted or Not exist");
    return;
  }

  if (path.basename(filePath).startsWith("resized-")) {
    console.log("File renamed!");
    return;
  }

  const destination_Bucket = gcs.bucket(obj_bucket);
  const tempFilePath = path.join(os.tmpdir(), path.basename(filePath));
  const metadata = { contentType: contentType };
  return destination_Bucket
    .file(filePath)
    .download({
      destination: tempFilePath
    })
    .then(() => {
      return spawn("convert", [tempFilePath, "-resize", "500x500", tempFilePath]);
    })
    .then(() => {
      return destination_Bucket.upload(tempFilePath, {
        destination: "resized-" + path.basename(filePath),
        metadata: metadata
      });
    });
});

exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Request Failed"
      });
    }
    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
      const bucket = gcs.bucket("gs://responsecitiapp.appspot.com");
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
          res.status(200).json({     
        message: "Boom working!"
        
          });
         return console.log("Working!")
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
    busboy.end(req.rawBody);
  });
});