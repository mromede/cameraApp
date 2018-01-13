import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public photos: any;
  public base64Image: string;
  constructor(public navCtrl: NavController, private camera: Camera, private alertCtrl: AlertController) {

  }
  ngOnInit(){
    this.photos = [];
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
     this.photos.push(this.base64Image);
     this.photos.reverse();
    }, (err) => {
     // Handle error
    });
  }

  deletePhoto(index){
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this image?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    alert.present();
    // this.photos.splice(index, 1);

  }
}
