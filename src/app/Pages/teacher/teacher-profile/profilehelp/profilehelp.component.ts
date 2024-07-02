import { Component } from '@angular/core';

@Component({
  selector: 'app-profilehelp',
  templateUrl: './profilehelp.component.html',
  styleUrls: ['./profilehelp.component.css']
})
export class ProfilehelpComponent {
  accordions: { title: string, content: string, active: boolean }[] = [
    { title: 'How to add new Course', content: '1)Click at Add new course button on the navBar or on the card\n2)Enter the infortmation of the course\n3)click at confirm button', active: false },
    { title: 'How to add new lessons', content: '1)Select the course to which you want to add lessons.\n2)Click at edit button\n3)Click at Add new lesson\n4)Enter the infromation\n5)Upload the video of lesson\n6)Enter at confirm. ', active: false },
    // Add more accordion items as needed
  ];

  toggleAccordion(index: number): void {
    this.accordions[index].active = !this.accordions[index].active;
  }
}
