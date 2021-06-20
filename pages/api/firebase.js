import * as admin from 'firebase-admin';
import serviceAccount from "./bluemovie-2eaeb-firebase-adminsdk-qrr9l-52a495006f.json"  

if(!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://bluemovie-2eaeb.appspot.com'
  });
}

const bucket = admin.storage().bucket()



export default bucket
  
