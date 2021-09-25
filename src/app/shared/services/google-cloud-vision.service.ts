import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiKey } from '../apiKey';

@Injectable()
export class GoogleService {


    private googleAPIURL = 'https://vision.googleapis.com/v1/images:annotate';
  
    constructor(private http: HttpClient) {}


    sendImage(base64Data: any): Observable<string>{

        return this.http.post<string>(this.googleAPIURL +`?key=${apiKey}`, {
            "requests":[
              {
                "image":{
                  "content": base64Data
                },
                "features":[
                  {
                    "type": "TEXT_DETECTION",
                    "maxResults":1
                  }
                ]
              }
            ]
          })
    }

}
