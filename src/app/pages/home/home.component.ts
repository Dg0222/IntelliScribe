import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GoogleService } from '../../shared/services/google-cloud-vision.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    form = new FormGroup({
      text: new FormControl()
    });
    imageBase64: any;
    imageTranscript: any;
  
    constructor(private googleService: GoogleService) {}

    ngOnInit(): void {
      // <input type="file" class="file-upload" (change)="convertImage($event)"/>
      // <form [formGroup]="form">
      //     <textarea formControlName="text"></textarea>
      //   </form>
    }

    convertImage(event) {

      var file = event.target.files[0];

      if(file){
        var reader = new FileReader();

        reader.onload = this.handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);

      }

    }

    sendImageToGoogle(){     
      this.googleService.sendImage(this.imageBase64).subscribe(result => {
        this.imageTranscript = result;

        console.log(this.imageTranscript);
        this.form.controls.text.setValue(this.imageTranscript.responses[0].fullTextAnnotation.text);
      });
    }

    handleReaderLoaded(readerEvent){
      var binaryString = readerEvent.target.result;

      this.imageBase64 = btoa(binaryString);

      this.sendImageToGoogle();
    }


}
