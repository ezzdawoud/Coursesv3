import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  role="/user"
  constructor(){
  
  }
  accordions: { title: string, content: string, active: boolean }[] = [
    { title: 'How to enrol in a course?', content: '1) Go to courses Page<br>2) Join the course you want to buy<br>3) Click on Join Course<br>4) Enter the twelve digit card number', active: false },
    { title: 'How to filter the courses?', content: '1) Go to courses Page<br>2) Click on the Filter Button<br>3)Select the filter.', active: false },
    { title: 'How to get card?', content: 'Contact us via this phone number:<a href="tel:+962 7XXXXXX">07XXXXXXX</a><br>or through social media<br>Facebook: <a href="https://www.facebook.com/BeHmtna" target="_blank">Corz Academy</a><br>Instagram: <a href="https://www.instagram.com/megateamwise" target="_blank">Corz Academy</a>', active: false },

    // Add more accordion items as needed
];


  toggleAccordion(index: number): void {
    this.accordions[index].active = !this.accordions[index].active;
  }
}
