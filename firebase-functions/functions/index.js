const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));

//ENDPOINT TO GET ALL IMAGES

app.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection("Images").get();
  let images = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();
    images.push({ id, ...data });
  });
  res.status(200).send(JSON.stringify(images));
});

exports.GetImages = functions.https.onRequest(app);
