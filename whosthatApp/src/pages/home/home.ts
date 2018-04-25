import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {Camera,CameraOptions} from '@ionic-native/camera';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  task: String="Snap Shot";
  image:any;


    constructor(public navCtrl: NavController,public camera:Camera, public toast:ToastController) {





  }
 openCamera()
  {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.image=this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.task="ID";
    }, (err) => {

      const toast= this.toast.create({
        message: "Error " + err,
        duration:3000,


    });
    toast.present();
      
     // Handle error
    });
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