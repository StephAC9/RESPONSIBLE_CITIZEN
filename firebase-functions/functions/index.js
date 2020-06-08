const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
admin.initializeApp();
const app = express();

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var XMLHttpRequest = require("xhr2");
//var xhr = new XMLHttpRequest();

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

exports.createLocation = functions.firestore
  .document(`/Images/{id}`)
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const latitude = data.latitude;
    const longitude = data.longitude;
    const location = getAddress(latitude, longitude);
  });

var request = new XMLHttpRequest();

function getAddress(latitude, longitude) {
  return new Promise(function (resolve, reject) {
    var method = "GET";
    var url =
      "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      latitude +
      "," +
      longitude +
      "&sensor=true";
    var async = true;

    request.open(method, url, async);
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200) {
          var data = JSON.parse(request.responseText);
          var address = data.results[0];
          resolve(address);
        } else {
          reject(request.status);
        }
      }
    };
    request.send();
  });
}
