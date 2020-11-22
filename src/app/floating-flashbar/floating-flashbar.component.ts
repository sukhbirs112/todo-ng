import { Component, OnInit, Input } from '@angular/core';

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
        top: '-200px'
      })),
      state('shown', style({
        top: '0px'
      })),
      transition('hidden => shown', [animate(500)]),
      transition('shown => hidden', [animate(500)])
    ])
  ]

})
export class FloatingFlashbarComponent implements OnInit {

  constructor() { }



  // No id, no service. id can be set without bind e.g. do <app-floating-flashbar id="test-id" ></app-floating-flashbar>
  @Input()
  id: string = '';

  message: string = '';

  animationStage: string = ''

  messages: string [] = [];

  ngOnInit(): void {

  }

  pushMessage(msg: string): void {
    if (!this.id) {
      return;
    }
    this.messages.push(msg);
    console.log('messages');
    console.log(this.messages);
    console.log(this.messages.length);
    if (this.message.length === 0) {
      this.message = this.messages[0];
      this.animationStage = 'hidden';
    }    
  }

  //
  onAnimationEvent(event: AnimationEvent): void {
    console.log('animation event');
    console.log(event);
    if (event.fromState === 'void' && event.toState === 'hidden' && event.phaseName === 'done') {
      this.animationStage = 'shown';
    }
    else if (event.fromState === 'hidden' && event.toState === 'shown' && event.phaseName === 'done') {
      setTimeout(() => { this.animationStage = 'hidden'; }, 3000)
    }
    else if (event.fromState === 'shown' && event.toState === 'hidden' && event.phaseName === 'done') {
      console.log('shift');
      this.messages.shift();
      this.animationStage = '';
      this.message = '';
  }
  else if (event.fromState === 'hidden' && event.toState === 'void' && event.phaseName === 'done') {
    console.log('yoyo')
    console.log(`remaining messages: ${this.messages.length}`);
    if (this.messages.length > 0) {
      console.log('doing more');
      this.message = this.messages[0];
      console.log(`now doing message: ${this.message}`);
      this.animationStage = 'hidden';
    }
  }
  }
}
