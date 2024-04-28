import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
export const show = () =>
  trigger('show', [
    state('TARGET', style({ opacity: 1, transform: 'translateX(0)' })),
    state('DUMMY', style({ opacity: 0, transform: 'translateX(100px)' })),
    transition('DUMMY=>TARGET', [
      // style({ opacity: 0, transform: 'translateX(100px)' }),
      animate(300),
    ]),
    transition('void=>*', [
      style({ opacity: 0, transform: 'translateX(100px)' }),
      animate(300),
    ]),
  ]);
export const listAnimation = () =>
  trigger('listAnimation', [
    state(
      'DUMMMY',
      style({
        opacity: 1,
        transform: 'translateX(0)',
      })
    ),
    transition('void=>*', [
      style({
        opacity: 0,
        transform: 'translateX(-100px)',
      }),
      animate(300),
    ]),
    transition('*=>void', [
      animate(
        500,
        style({
          opacity: 0,
        })
      ),
    ]),
  ]);

export const dialogAnimation = (enterDuration, leaveDuration) =>
  trigger('dialogAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(`${enterDuration}s`, style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(`${leaveDuration}s`, style({ opacity: 0 })),
    ]),
  ]);
