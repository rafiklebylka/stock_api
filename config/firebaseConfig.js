const admin = require('firebase-admin');

const serviceAccount = require('./../firebase-credentials.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});


const firestore = admin.firestore();
module.exports = { firestore, admin };