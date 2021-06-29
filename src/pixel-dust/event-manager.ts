export enum EventType {
  CLICK_DOWN = 'CLICK_DOWN',
  CLICK_DOWN_DRAG = 'CLICK_DOWN_DRAG',
  SPACE_CLICK_DOWN = 'SPACE_CLICK_DOWN',
  SPACE_CLICK_DOWN_DRAG = 'SPACE_CLICK_DOWN_DRAG',
  CLICK_UP = 'CLICK_UP',
  SPACE_DOWN = 'SPACE_DOWN',
  SPACE_UP = 'SPACE_UP'
}

export type ClickDownObserver = {
  method: (x: number, y: number) => void;
  event: EventType.CLICK_DOWN;
};

export type ClickDownDragObserver = {
  method: (x: number, y: number) => void;
  event: EventType.CLICK_DOWN_DRAG;
};

export type SpaceClickDownDragObserver = {
  method: (x: number, y: number) => void;
  event: EventType.SPACE_CLICK_DOWN_DRAG;
};

export type SpaceClickDownObserver = {
  method: (x: number, y: number) => void;
  event: EventType.SPACE_CLICK_DOWN;
};

export type ClickUpObserver = {
  method: (x: number, y: number) => void;
  event: EventType.CLICK_UP;
};

export type SpaceDownObserver = {
  method: () => void;
  event: EventType.SPACE_DOWN;
};

export type SpaceUpObserver = {
  method: () => void;
  event: EventType.SPACE_UP;
};

type EventManagerProps = {
  canvasContainerElement: HTMLDivElement;
};

class EventManager {
  targetElement: HTMLDivElement;

  observerList: (
    | ClickDownObserver
    | ClickDownDragObserver
    | SpaceClickDownObserver
    | SpaceClickDownDragObserver
    | ClickUpObserver
    | SpaceDownObserver
    | SpaceUpObserver
  )[];

  activeKeyMap: Record<string, boolean> = {
    click: false,
    space: false
  };

  constructor(options: EventManagerProps) {
    this.observerList = [];
    this.targetElement = options.canvasContainerElement;

    this.targetElement.addEventListener('mousedown', this.onMouseDownHandler.bind(this));
    this.targetElement.addEventListener('mousemove', this.onMouseMoveHandler.bind(this));
    this.targetElement.addEventListener('mouseup', this.onMouseUpHandler.bind(this));

    window.addEventListener('keydown', this.onKeyDownHandler.bind(this));
    window.addEventListener('keyup', this.onKeyUpHandler.bind(this));
  }

  registerObserver(
    observer:
      | ClickDownObserver
      | ClickDownDragObserver
      | SpaceClickDownObserver
      | SpaceClickDownDragObserver
      | ClickUpObserver
      | SpaceDownObserver
      | SpaceUpObserver
  ): void {
    this.observerList.push(observer);
  }

  onMouseDownHandler(event: MouseEvent): void {
    this.activeKeyMap.click = true;

    if (this.activeKeyMap.space && this.activeKeyMap.click) {
      this.observerList
        .filter((observer) => observer.event === EventType.SPACE_CLICK_DOWN)
        .forEach((observer) => observer.method(event.clientX, event.clientY));

      return;
    }

    this.observerList
      .filter((observer) => observer.event === EventType.CLICK_DOWN)
      .forEach((observer) => observer.method(event.clientX, event.clientY));

    this.observerList
      .filter((observer) => observer.event === EventType.CLICK_DOWN_DRAG)
      .forEach((observer) => observer.method(event.clientX, event.clientY));
  }

  onMouseMoveHandler(event: MouseEvent): void {
    if (this.activeKeyMap.space && this.activeKeyMap.click) {
      this.observerList
        .filter((observer) => observer.event === EventType.SPACE_CLICK_DOWN_DRAG)
        .forEach((observer) => observer.method(event.clientX, event.clientY));

      return;
    }

    if (this.activeKeyMap.click)
      this.observerList
        .filter((observer) => observer.event === EventType.CLICK_DOWN_DRAG)
        .forEach((observer) => observer.method(event.clientX, event.clientY));
  }

  onMouseUpHandler(event: MouseEvent): void {
    this.activeKeyMap.click = false;

    this.observerList
      .filter((observer) => observer.event === EventType.CLICK_UP)
      .forEach((observer) => observer.method(event.clientX, event.clientY));
  }

  onKeyDownHandler(event: KeyboardEvent): void {
    this.activeKeyMap[event.code.toLowerCase()] = true;

    switch (event.code.toLowerCase()) {
      case 'space':
        this.observerList
          .filter((observer) => observer.event === EventType.SPACE_DOWN)
          .forEach((observer) => (observer as SpaceDownObserver).method());
        break;
      default:
        break;
    }
  }

  onKeyUpHandler(event: KeyboardEvent): void {
    this.activeKeyMap[event.code.toLowerCase()] = false;

    switch (event.code.toLowerCase()) {
      case 'space':
        this.observerList
          .filter((observer) => observer.event === EventType.SPACE_UP)
          .forEach((observer) => (observer as SpaceUpObserver).method());
        break;
      default:
        break;
    }
  }
}

export default EventManager;
