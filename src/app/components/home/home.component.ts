import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import gsap from 'gsap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showContent = false;

  @ViewChild('main') mainRef!: ElementRef;
  @ViewChild('sky') skyRef!: ElementRef;
  @ViewChild('bg') bgRef!: ElementRef;
  @ViewChild('character') characterRef!: ElementRef;
  @ViewChild('text') textRef!: ElementRef;
  @ViewChild('svgWrapper') svgWrapperRef!: ElementRef;

  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const tl = gsap.timeline();

    tl.to('.vi-mask-group', {
      rotate: 10,
      duration: 2,
      ease: 'power4.inOut',
      transformOrigin: '50% 50%',
    }).to('.vi-mask-group', {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: 'expo.inOut',
      transformOrigin: '50% 50%',
      opacity: 0,
      onUpdate: () => {
        if (tl.progress() >= 0.9) {
          // Remove SVG overlay
          this.svgWrapperRef?.nativeElement?.remove();

          // Trigger *ngIf content to render
          this.showContent = true;
          this.cdr.detectChanges();

          // Wait for DOM to be updated before accessing ViewChild refs
          setTimeout(() => {
            this.animateShowContent();
          }, 0);

          tl.kill();
        }
      },
    });
  }

  animateShowContent(): void {
    if (
      !this.mainRef ||
      !this.skyRef ||
      !this.bgRef ||
      !this.characterRef ||
      !this.textRef
    ) return;
  
    gsap.to(this.mainRef.nativeElement, {
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: 'expo.inOut',
    });
  
    gsap.to(this.skyRef.nativeElement, {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      ease: 'expo.inOut',
    });
  
    gsap.to(this.bgRef.nativeElement, {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      ease: 'expo.inOut',
    });
  
    gsap.to(this.textRef.nativeElement, {
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: 'expo.inOut',
    });
  
    // Responsive character positioning
    const isMobile = window.innerWidth < 640;
  
    gsap.to(this.characterRef.nativeElement, {
      scale: isMobile ? 0.5 : 0.6,
      x: '-1%',
      bottom: isMobile ? '-65%' : '-80%',
      rotate: 0,
      duration: 2,
      ease: 'expo.inOut',
    });
  
    gsap.from(".resume-btn", {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 1.5,
      ease: "power4.out"
    });
  
    // Mousemove parallax effect
    this.mouseMoveListener = (e: MouseEvent) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(this.textRef.nativeElement, { x: `${xMove * 0.5 - 45}%` });
      gsap.to(this.skyRef.nativeElement, { x: xMove });
      gsap.to(this.bgRef.nativeElement, { x: xMove * 1.7 });
    };
  
    this.mainRef.nativeElement.addEventListener('mousemove', this.mouseMoveListener);
  }
  

  ngOnDestroy(): void {
    // Cleanup mousemove listener
    if (this.mouseMoveListener) {
      this.mainRef?.nativeElement?.removeEventListener(
        'mousemove',
        this.mouseMoveListener
      );
    }
  }
}
