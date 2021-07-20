import { fromEvent, Observable, concat } from 'rxjs';
import { switchMap, filter, takeUntil, repeat, take, skip, tap, map } from 'rxjs/operators';

type EventManagerProps = {
  canvasContainerElement: HTMLDivElement;
  stage: HTMLDivElement;
};

class EventManager {
  targetElement: HTMLDivElement;

  containerElement: HTMLDivElement;

  canvasMoveCache = {
    prevX: 0,
    prevY: 0,
    initX: 0,
    initY: 0
  };

  canvasScaleCache = {
    scale: 1
  };

  canvasMove$: Observable<{
    x: number;
    y: number;
  }>;

  canvasDraw$: Observable<{
    x: number;
    y: number;
  }>;

  canvasScale$: Observable<{
    scale: number;
  }>;

  constructor(options: EventManagerProps) {
    this.targetElement = options.canvasContainerElement;
    this.containerElement = options.stage;

    const mouseDown$ = fromEvent<MouseEvent>(this.targetElement, 'mousedown');
    const mouseMove$ = fromEvent<MouseEvent>(this.targetElement, 'mousemove');
    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');
    const wheel$ = fromEvent<WheelEvent>(this.containerElement, 'wheel').pipe(
      tap((event: WheelEvent) => {
        event.preventDefault();
      })
    );

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

    this.canvasScale$ = wheel$.pipe(
      filter((event: WheelEvent) => event.ctrlKey),
      map((event) => {
        const prevScale = this.canvasScaleCache.scale;

        if (event.deltaY < 0) {
          if (prevScale <= 0.7) {
            return this.canvasScaleCache;
          }

          this.canvasScaleCache = {
            scale: prevScale - 0.1
          };

          return this.canvasScaleCache;
        }

        if (prevScale >= 2) {
          return this.canvasScaleCache;
        }

        this.canvasScaleCache = {
          scale: prevScale + 0.1
        };

        return this.canvasScaleCache;
      })
    );

    this.canvasDraw$ = concat(mouseDown$.pipe(take(1)), mouseMove$).pipe(
      map((event: MouseEvent) => ({ x: event.offsetX, y: event.offsetY })),
      takeUntil(this.canvasMove$),
      takeUntil(mouseUp$),
      repeat()
    );
  }

  // eslint-disable-next-line class-methods-use-this
  cleanUp(): void {
    console.info('clean up for event manager called');
  }
}

export default EventManager;
