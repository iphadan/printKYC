import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('kycForm', { static: false }) kycForm!: NgForm;
  [x: string]: any;
  title = 'PrintKYC';
  formFields: { [key: string]: string } = {};


  selectedFile: any;
  imageURL: string = "";
  previewVisible = false; // Indicates whether the preview is visible
  pdfPreviewUrl!: string; // Holds the URL of the PDF preview

  hideFileInput = false;
  hideJoint = true;
  
  previewPDF() {

    const doc = new jsPDF();
    const formFields = this.kycForm.value;
    console.log('preview', formFields)

    // Set the font size and position for the first field
    let fontSize = 12;
    let positionX = 20;
    let positionY = 20;

    // Iterate over the form fields and add them to the PDF
    for (const fieldName in formFields) {
      if (formFields.hasOwnProperty(fieldName)) {
        const fieldValue = formFields[fieldName];
        doc.setFontSize(fontSize);
        doc.text(`${fieldName}: ${fieldValue}`, positionX, positionY);
        positionY += 10; // Increase the Y position for the next field
      }
    }

    // Generate the PDF data URL for preview
    const pdfDataUri = doc.output('datauristring');

    // Set the preview URL and make it visible
    this.pdfPreviewUrl = pdfDataUri;
    this.previewVisible = true;
  }


  @ViewChild('content', { static: false }) content!: ElementRef



  public async Download() {
    window.print();
  }


  generatePDF() {
    const contentElement = this.content.nativeElement;


    ;
    html2canvas(contentElement).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = 250

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('test.pdf');

    });
  }




  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => (this.imageURL = reader.result as string);

      reader.readAsDataURL(file);
    }
  }


  onChangeButton() {
    if (this.hideJoint === false) {
      this.hideJoint = true
      console.log("clicked")
      console.log(this.kycForm.value["customerNumber"]);
    }
    else {
      this.hideJoint = false
    }

  }

  @HostListener('document:keydown.control.p', ['$event'])
  onPrint(event: KeyboardEvent | MouseEvent) {
    event.preventDefault(); // Prevent default browser print behavior
    this.hideFileInput = true;

    // Wait for the next event loop cycle to ensure the DOM is updated
    setTimeout(() => {
      window.print();
      this.hideFileInput = false;
    }, 0);
  }

  @HostListener('window:beforeprint')
  onBeforePrint() {
    this.hideFileInput = true;
  }

  @HostListener('window:afterprint')
  onAfterPrint() {
    this.hideFileInput = false;
  }
}






