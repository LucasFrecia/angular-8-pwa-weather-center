import {
    trigger,
    style,
    animate,
    transition,
    state
  } from '@angular/animations';

export const transitions = [
    trigger('enter-item', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 })
        )
      ])
    ]),
    trigger('left-to-right-enter', [
      transition(':enter', [
        style({  'margin-left': '-200px', opacity: 0 }),
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ 'margin-left': '0px', opacity: 1 })
        )
      ])
    ]),
    trigger('fade', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(600)
      ])
    ])
];
