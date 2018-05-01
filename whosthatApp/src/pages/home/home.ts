import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, Loading } from 'ionic-angular';
import {Camera,CameraOptions} from '@ionic-native/camera';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule, AngularFirestore} from 'angularfire2/firestore';
import {AngularFireStorageModule, AngularFireUploadTask, AngularFireStorage} from 'angularfire2/storage';
import { Observable } from '@firebase/util';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  task: String="./assets/imgs/cam.png";
 // task: String="Snap Shot";
  image:any;

  //upload task
  taskimg: AngularFireUploadTask;


  //firestore data
  result: Observable<any>;

  loading : Loading;



    constructor(public navCtrl: NavController,public camera:Camera, public toast:ToastController,
                private storage: AngularFireStorage, private store: AngularFirestore,
                private AFM: AngularFireModule, private loadCtrl: LoadingController) {

                  this.loading= this.loadCtrl.create({

                 content: 'Detecting image',
                  }); 
            

}

startUpload(file :string )
{

  this.loading.present();// show loading

  const docId=this.store.createId();//generate ranodm Id

  const path= '${docId}.jpg';

  //make reference for the future location
  const photoRef= this.store.collection('photos').doc(docId);

//firestore observable
   // Firestore observable, dismiss loader when data is available
 /*  this.result = photoRef.valueChanges()
   .pipe(
     filter(data => !!data),
     tap(_ => this.loading.dismiss())
   );
*/

//the main task
this.image ='data:image/jpg;base64,' + file;
this.taskimg = this.storage.ref(path).putString(this.image, 'data_url'); 

}


// Gets the pic from the native camera then starts the upload
async captureAndUpload() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  const base64 = await this.camera.getPicture(options)
//upload to firebase
  this.startUpload(base64);
}

 async openCamera()
  {

    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    const base64:any = await this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
    this.image = 'data:image/jpeg;base64,' + imageData;
    // this.task="ID";
  this.task="./assets/imgs/ID.png"
  

}, (err) => {

      const toast= this.toast.create({
        message: "Error " + err,
        duration:3000,


    });
    toast.present();
      
     // Handle error
    });

   this.startUpload(base64);
  }

 /** async takePicture():Promise<any>
  {
    try{
      this.image=await this.camera.getPicture(this.options);
    }
    catch(e)
    { const toast= this.toast.create({
        message: "No camera found",
        duration:3000,


    });
    }
    **/
    
  

}
