import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


//firebase

import * as admin from 'firebase-admin';
admin.initializeApp();



//cloudVision

import * as vision from '@google-cloud/vision';
 const visionClient=new vision.ImageAnnotatorClient();



 //Dedicated bucket for cloud function invocation
 //not paying for it
 const bucketName= 'assistantapp-b0165.appspot.com';

 export const imageTagger=functions.storage
 //.bucket(bucketName)
 .object()
 .onArchive( async event => {

         // File data
         const object = event.metadata;
         const filePath = object.name;   

         // Location of saved file in bucket
         const imageUri = `gs://${bucketName}/${filePath}`;

         const docId = filePath.split('.jpg')[0];

         const docRef  = admin.firestore().collection('photos').doc(docId);

         // Await the cloud vision response
         const results = await visionClient.labelDetection(imageUri);

         // Map the data to desired format
         const labels = results[0].labelAnnotations.map(obj => obj.description);
         const animal = labels.includes('animal')


         return docRef.set({ animal,labels })           
});

