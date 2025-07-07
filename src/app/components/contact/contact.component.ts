import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactData = {
    email: 'sudeeptagiri.11@gmail.com',
    socials: [
      { platform: 'Github', url: 'https://github.com/SudeeptaGiri' },
      { platform: 'Linkedin', url: 'https://www.linkedin.com/in/sudeepta-giri-6a888521b/' },
      { platform: 'Twitter', url: 'https://x.com/sudeepta_giri' },
      { platform: 'Instagram', url: 'https://www.instagram.com/ai.sudeepta/?hl=en' },
    ]
  };
}
