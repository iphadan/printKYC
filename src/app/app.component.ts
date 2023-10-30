import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AmharicComponent } from './amharic/amharic.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  language="English";
  hideFileInput=false;

  onSelect(event:any){
    this.language=event.target.value;
    console.log(this.language)
  }
  

  @HostListener('document:keydown.control.p', ['$event'])
  onPrint(event: KeyboardEvent | MouseEvent) {
    event.preventDefault(); // Prevent default browser print behavior
    this.hideFileInput = true;

    // Wait for the next event loop cycle to ensure the DOM is updated
    setTimeout(() => {
      window.print()
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






