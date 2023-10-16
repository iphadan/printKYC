import { Component, ElementRef, ViewChild } from '@angular/core';
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


  previewVisible = false; // Indicates whether the preview is visible
  pdfPreviewUrl!: string; // Holds the URL of the PDF preview

  previewPDF() {

    const doc = new jsPDF();
    const formFields = this.kycForm.value;
    console.log('preview',formFields)
    
    // Set the font size and position for the first field
    let fontSize = 12;
    let positionX = 20;
    let positionY = 20;

    // Iterate over the form fields and add them to the PDF
    for (const fieldName in formFields) {
      if (formFields.hasOwnProperty(fieldName)) {
        const fieldValue = formFields[fieldName];
        doc.setFontSize(fontSize);
        doc.text(`${fieldName}: ${fieldValue}`,positionX, positionY );
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

   
  generatePDF()  {
    const contentElement = this.content.nativeElement;
    contentElement.style.fontSize = '40 px'
    html2canvas(contentElement).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('test.pdf');
      contentElement.style.fontSize = '';
    });
  }

}
