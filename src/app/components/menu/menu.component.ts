// gta-menu.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  animations: [
    trigger('menuAnimation', [
      state('closed', style({
        opacity: 0,
        transform: 'scale(0.8) rotateX(10deg)',
        backdropFilter: 'blur(0px)'
      })),
      state('open', style({
        opacity: 1,
        transform: 'scale(1) rotateX(0deg)',
        backdropFilter: 'blur(8px)'
      })),
      transition('closed => open', animate('0.6s cubic-bezier(0.25, 0.8, 0.25, 1)')),
      transition('open => closed', animate('0.4s ease-in-out'))
    ]),
    trigger('itemAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(30px) rotateX(15deg)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0) rotateX(0deg)'
      })),
      transition('hidden => visible', animate('0.8s ease-in-out'))
    ])
  ]
})
export class MenuComponent {
  isOpen = false;
  menuState = 'closed';

  menuItems = [
    { name: 'Home', route: '/home', number: 1, state: 'hidden' },
    { name: 'Work', route: '/projects' , number: 2, state: 'hidden' },
    { name: 'Contact', route: '/contacts', number: 3, state: 'hidden' },
  ];

  constructor(private router: Router) {}

  openMenu() {
    console.log('Menu opened');
    this.isOpen = true;
    this.menuState = 'open';
    // Animate items sequentially
    setTimeout(() => {
      this.menuItems.forEach((item, index) => {
        setTimeout(() => {
          item.state = 'visible';
        }, index * 100);
      });
    }, 300);
  }

  closeMenu() {
    this.menuState = 'closed';
    this.menuItems.forEach(item => item.state = 'hidden');
    setTimeout(() => {
      this.isOpen = false;
    }, 400); // Match the animation duration
  }

  navigateTo(route: string) {
    this.closeMenu();
    setTimeout(() => {
      this.router.navigate([route]);
    }, 400);
  }
}
