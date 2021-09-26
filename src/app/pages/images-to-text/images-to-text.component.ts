import { analyzeAndValidateNgModules } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { GoogleService } from "../../shared/services/google-cloud-vision.service";

@Component({
  selector: "app-home",
  templateUrl: "./images-to-text.component.html",
  styleUrls: ["./images-to-text.component.scss"],
})
export class ImagesToTextComponent implements OnInit {
  form = new FormGroup({
    text: new FormControl(),
    file: new FormControl(),
  });

  imageBase64: any;
  imageTranscript: any;
  imageURL = "";
  buttonsDisabled = true;

  constructor(private googleService: GoogleService) {}

  ngOnInit(): void {}

  convertImage(event) {
    var file = event.target.files[0];

    if (file) {
      var readerBase64 = new FileReader();
      var readerURL = new FileReader();

      readerBase64.onload = this.handleReaderLoaded.bind(this);

      readerURL.onloadend = () => {
        this.imageURL = readerURL.result.toString();
      };

      readerBase64.readAsBinaryString(file);
      readerURL.readAsDataURL(file);
    }
  }

  sendImageToGoogle() {
    this.googleService.sendImage(this.imageBase64).subscribe((result) => {
      this.imageTranscript = result;

      console.log(this.imageTranscript);
      this.form.controls.text.setValue(
        this.imageTranscript.responses[0].fullTextAnnotation.text
      );
    });
  }

  handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;

    this.imageBase64 = btoa(binaryString);

    if (this.imageBase64 != "" || this.imageBase64 != null) {
      this.buttonsDisabled = false;
    }
  }

  sendImage() {
    this.sendImageToGoogle();
  }

  reset() {
    this.imageBase64 = "";
    this.imageURL = "";

    this.buttonsDisabled = true;

    this.form.controls.text.setValue("");
    this.form.controls.file.setValue("");
  }
}
