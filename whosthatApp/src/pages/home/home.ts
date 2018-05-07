import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import {Camera,CameraOptions} from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from "angularfire2/database-deprecated";
import { FileChooser } from '@ionic-native/file-chooser';

import firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  task: String="./assets/imgs/cam.png";
 // task: String="Snap Shot";
  image:any;



 /* public ROOT_URL = 'https://vision.googleapis.com';
  public API_KEY = 'AIzaSyDtecgFhfcxmFopdVcqlO9jj7HE_kG14Bo'; // YOUR CLOUD PLATFORM API KEY
  public visionRequest = {
    "requests": [{
        "image": {
          "content": "base64-encoded-image"
        },
        "features": [{
            "type": "LABEL_DETECTION",
            "maxResults": 1
        }]
    }]
  };*/

    constructor(public navCtrl: NavController,public camera:Camera, public toast:ToastController, public loadingCtrl: LoadingController,
      public http: HttpClient,public alert:AlertController,
    //  private db: AngularFireStorageModule,
      private vision: GoogleCloudVisionServiceProvider,
      private fileChooser: FileChooser ) {
   //initialize db



}
 openCamera()
  {

    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
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
  }

openGallery()
{
  this.fileChooser.open()
  .then(uri => console.log(uri))
  .catch(err=>this.presentToast("error: "  + err));
}



  upload() {

    try{
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);
    imageRef.putString(this.image, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      // Do something here when the data is succesfully uploaded!
      const toast= this.toast.create({
        message: "Upload succesful",
        duration:3000,
  
  
    });
    toast.present();
    loader.dismiss(); // hide loading component
     });
     let loader = this.loadingCtrl.create({
      content: "Uploading image..."
    });

    loader.present(); // show loading component
    }
    catch(e)
    {
      const toast= this.toast.create({
        message: "Error " + e,
        duration:3000,


    });
    toast.present();
      
    }



  }





  CaptureandDetect()
  {

    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    /**let loader = this.loadingCtrl.create({
      content: "Detecting image..."
    });**/

   // loader.present(); // show loading component


    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
   this.vision.getLabels(imageData).subscribe((result)=>{
//this.saveResults(imageData,result.json().responses);
     this.showAlert(result.json().responses[0]);

   },err => {
    this.showAlert("ERROR: " + err);
  });
     this.image = 'data:image/jpeg;base64,' + imageData;    
     },
     
    // this.task="ID";
  //this.task="./assets/imgs/ID.png"
     (err) => {

  this.presentToast("error" + err);
      
     // Handle error
    });


  }
  saveResults(imageData, results) {
    //this.items.push({ imageData: imageData, results: results})
      //.then(_ => { }).then(err => { this.showAlert(err) });
  }


  showAlert(message) {
    let alert = this.alert.create({
      title: 'Ionic Vision',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast(message) {
    let toast = this.toast.create({
      message,
      duration: 3000
    });
    toast.present();
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
