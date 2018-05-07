import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { environment } from '../../environment';
@Injectable()
export class GoogleCloudVisionServiceProvider {
  googleCloudVisionAPIKey:any='163202004626-mvbavij8onru4b4lmf30n40vmbr3omcd.apps.googleusercontent.com';

  constructor(/*public http: Http*/ public http: Http) { }
  getLabels(base64Image) {
    const body = {
      "requests": [
        {
          "image": {
            "content": base64Image
          },
          "features": [
            {
              "type": "LABEL_DETECTION",
              "maxResults":10
            }
          ]
        }
      ]
    }
   return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + this.googleCloudVisionAPIKey, body);
    }
}