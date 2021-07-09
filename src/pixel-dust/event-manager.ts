import { fromEvent, Subject, Observable, concat } from 'rxjs';
import { switchMap, filter, takeUntil, repeat, take, skip, tap, map } from 'rxjs/operators';

type EventManagerProps = {
  canvasContainerElement: HTMLDivElement;
};

class EventManager {
  targetElement: HTMLDivElement;

  private destroy$ = new Subject<void>();

  canvasMoveCache = {
    prevX: 0,
    prevY: 0,
    initX: 0,
    initY: 0
  };

  canvasMove$: Observable<{
    x: number;
    y: number;
  }>;

  canvasDraw$: Observable<{
    x: number;
    y: number;
  }>;

  constructor(options: EventManagerProps) {
    this.targetElement = options.canvasContainerElement;

    const mouseDown$ = fromEvent<MouseEvent>(this.targetElement, 'mousedown');
    const mouseMove$ = fromEvent<MouseEvent>(this.targetElement, 'mousemove');
    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');

    const spaceKeyDown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      filter((event: KeyboardEvent) => event.code.toLowerCase() === 'space')
    );
    const spaceKeyUp$ = fromEvent<KeyboardEvent>(document, 'keyup').pipe(
      filter((event: KeyboardEvent) => event.code.toLowerCase() === 'space')
    );

    this.canvasMove$ = spaceKeyDown$.pipe(
      take(1),
      switchMap(() => {
        return concat(
          mouseDown$.pipe(
            take(1),
            tap((event: MouseEvent) => {
              const { clientX: x, clientY: y } = event;
              this.canvasMoveCache = {
                ...this.canvasMoveCache,
                prevX: x,
                prevY: y
              };
            })
          ),
          mouseMove$
        ).pipe(takeUntil(mouseUp$));
      }),
      skip(1),
      map((event: MouseEvent) => {
        const { clientX: x, clientY: y } = event;
        const { prevX, prevY, initX, initY } = this.canvasMoveCache;
        const nextX = x - prevX + initX;
        const nextY = y - prevY + initY;
        this.canvasMoveCache = {
          prevX: x,
          prevY: y,
          initX: nextX,
          initY: nextY
        };

        return {
          x: nextX,
          y: nextY
        };
      }),
      takeUntil(spaceKeyUp$),
      repeat()
    );

    this.canvasDraw$ = concat(mouseDown$.pipe(take(1)), mouseMove$).pipe(
      map((event: MouseEvent) => ({ x: event.offsetX, y: event.offsetY })),
      takeUntil(this.canvasMove$),
      takeUntil(mouseUp$),
      repeat()
    );
  }
}

export default EventManager;
