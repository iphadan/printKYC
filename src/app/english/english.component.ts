import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { AmharicComponent } from '../amharic/amharic.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-english',
  templateUrl: './english.component.html',
  styleUrls: ['./english.component.css']
})
export class EnglishComponent {
  @ViewChild('kycForm', { static: false }) kycForm!: NgForm;

  appcomponent: AppComponent = new AppComponent;
  [x: string]: any;
  title = 'PrintKYC';
  formFields: { [key: string]: string } = {};
  language="English";
  formNumber:number=0
  formNumberArray=Array(this.formNumber).fill(0)
 photoURLArray=Array(this.formNumber).fill(0)

  selectedFile: any;
  imageURL: string = "";
  

  hideFileInput = false;
  hideJoint = true;
  
 


 




  onFileSelected(event: any,i:number) {
    if (event.target.files && event.target.files[0]) {
      
      const file = event.target.files[0];
      this.selectedFile = file;
      const reader = new FileReader();

  
      reader.onload = (e) => (this.photoURLArray[i]= reader.result as string);

      reader.readAsDataURL(file);
    }
  }
onSelect(event:any){
  this.language=event.target.value;

}

  onChangeButton(formNumber : String) {
    if (Number(formNumber  )>=3){
      return
    }
    if (Number(formNumber) && this.hideJoint == true && Number(formNumber) >0){
this.hideJoint=false


    }
  else if (Number(formNumber) == 0){
    this.hideJoint=true
  }
    this.formNumberArray=Array(0).fill(0)
    let i:number;
this.formNumber=Number(formNumber);
for(i = 1;i<=this.formNumber;i++) {

  this.formNumberArray.push(i+1);
  this.photoURLArray.push("");
  console.log(i)
  
 
}
this.formNumber=0;

console.log(this.formNumberArray)


  }


  onPrint(event: MouseEvent) {
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
