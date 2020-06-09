const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
admin.initializeApp();

const app = express();
const app1 = express();
const app2 = express();
const app3 = express();
const app4 = express();
const app5 = express();
const app6 = express();

app.use(bodyParser.json);
app.use(cors({ origin: true }));
app1.use(cors({ origin: true }));
app2.use(cors({ origin: true }));
app3.use(cors({ origin: true }));
app4.use(cors({ origin: true }));
app5.use(cors({ origin: true }));
app6.use(cors({ origin: true }));

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

// endpoint to get images sent to the the traffikveket
app1.get("/", async (req, res) => {
  const snapshot = await admin
    .firestore()
    .collection("Images")
    .where("authority", "==", "TRAFFIKVERKET")
    .get();
  let images = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();
    images.push({ id, ...data });
  });
  res.status(200).send(JSON.stringify(images));
});

exports.GetTraffikImages = functions.https.onRequest(app1);

// endpoint to get images sent to the the police
app2.get("/", async (req, res) => {
  const snapshot = await admin
    .firestore()
    .collection("Images")
    .where("authority", "==", "POLICE")
    .get();
  let images = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();
    images.push({ id, ...data });
  });
  res.status(200).send(JSON.stringify(images));
});

exports.GetPoliceImages = functions.https.onRequest(app2);

// endpoint to get images sent to the the migration
app3.get("/", async (req, res) => {
  const snapshot = await admin
    .firestore()
    .collection("Images")
    .where("authority", "==", "MIGRATIONSVERKET")
    .get();
  let images = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();
    images.push({ id, ...data });
  });
  res.status(200).send(JSON.stringify(images));
});

exports.GetMigrationImages = functions.https.onRequest(app3);

// endpoint to get images sent to the the municipality
app4.get("/", async (req, res) => {
  const snapshot = await admin
    .firestore()
    .collection("Images")
    .where("authority", "==", "KOMMUN")
    .get();
  let images = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();
    images.push({ id, ...data });
  });
  res.status(200).send(JSON.stringify(images));
});

exports.GetMunicipalityImages = functions.https.onRequest(app4);

// endpoint to get images sent to the the skatteverket
app5.get("/", async (req, res) => {
  const snapshot = await admin
    .firestore()
    .collection("Images")
    .where("authority", "==", "SKATTEVERKET")
    .get();
  let images = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();
    images.push({ id, ...data });
  });
  res.status(200).send(JSON.stringify(images));
});

exports.GetSkatteverketImages = functions.https.onRequest(app5);

// function triggered when new data (documetn) is added to the firestore database.

exports.reverseGeoLocation = functions.firestore
  .document(`/Images/{id}`)
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const latitude = data.latitude;
    const longitude = data.longitude;

    return snap.ref.set(
      {
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        computedLocation: "Sweden",
      },
      { merge: true }
    );
  });

// function that triggers when a user is created
/* exports.createUser = functions.auth.user().onCreate((user) => {
  const userUid = user.uid; // The UID of the user.
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.

  // set account  doc
  const account = {
    useruid: userUid,
    email: email,
    displayName: displayName,
  };
  firebase
    .firestore()
    .collection("Users")
    .doc(userUid)
    .set(account)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...;
    });
}); */

// function to send users list
app6.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection("Users").get();
  let images = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();
    images.push({ id, ...data });
  });
  res.status(200).send(JSON.stringify(images));
});

exports.GetUsers = functions.https.onRequest(app6);

//ENDPOINT TO READ one IMAGE
app.get("/:id", async (req, res) => {
  const snapshot = await admin
    .firestore()
    .collection("Users")
    .doc(req.params.id)
    .get();
  const userId = snapshot.uid;
  const userName = snapshot.name;
  const userData = snapshot.data();
  const userAuthority = snapshot.authority;
  console.log(snapshot);

  res.status(200).send.json({
    id: userId,
    name: userName,
    authority: userAuthority,
    ...userData,
  });
});

exports.GetUser = functions.https.onRequest(app);
