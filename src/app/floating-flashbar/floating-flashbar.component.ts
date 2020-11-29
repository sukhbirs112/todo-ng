import { Component, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';

// animation
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-floating-flashbar',
  templateUrl: './floating-flashbar.component.html',
  styleUrls: ['./floating-flashbar.component.css'],

  // animations
  // https://stackoverflow.com/questions/41966673/parameter-in-to-animation-angular2
  animations: [
    trigger('flashBar', [
      state('hidden', style({
        top: '-{{ offset }}px'
      }), { params: { offset: 0 } }),
      state('shown', style({
        top: '0px'
      })),
      transition('hidden => shown', [animate(500)]),
      transition('shown => hidden', [animate(500)])
    ])
  ]

})
export class FloatingFlashbarComponent implements OnInit, AfterViewInit {

  constructor(private myElement: ElementRef) { 
  }



  // No id, no service. id can be set without bind e.g. do <app-floating-flashbar id="test-id" ></app-floating-flashbar>
  @Input()
  id: string = '';

  message: string = '';

  animationStage: string = ''

  offset: number;

  messages: string[] = [];

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if (!this.id) {
      return;
    }
    this.offset = this.calculateOffset();
  }

  calculateOffset(message: string = ''): number {
    // count number of new line characters to see how many lines there are in the message
    let lines = 1;
    const n = message.length;
    for (let i = 0; i < n; i++ ) {
      if (message.charAt(i) === '\n') {
        lines++;
      }
    }

    const fontSize = 16;
    const margin = 20 * 2;
    const padding = 10 * 2;
    return this.myElement.nativeElement.getBoundingClientRect().top + margin + padding + (fontSize * lines);
  }

  pushMessage(msg: string): void {
    if (!this.id) {
      return;
    }
    this.messages.push(msg);
    if (this.message.length === 0) {
      this.message = this.messages[0];
      this.offset = this.calculateOffset(this.message);
      this.animationStage = 'hidden';
    }
  }

  // controller for animation events
  onAnimationEvent(event: AnimationEvent): void {
    if (event.fromState === 'void' && event.toState === 'hidden' && event.phaseName === 'done') {
      this.animationStage = 'shown';
    }
    else if (event.fromState === 'hidden' && event.toState === 'shown' && event.phaseName === 'done') {
      setTimeout(() => { this.animationStage = 'hidden'; }, 3000)
    }
    else if (event.fromState === 'shown' && event.toState === 'hidden' && event.phaseName === 'done') {
      this.messages.shift();
      this.animationStage = '';
      this.message = '';
    }
    else if (event.fromState === 'hidden' && event.toState === 'void' && event.phaseName === 'done') {
      if (this.messages.length > 0) {
        this.message = this.messages[0];
        this.offset = this.calculateOffset(this.message);
        this.animationStage = 'hidden';
      }
    }
  }
}
