import { Subject } from 'rxjs';
import { DrawCommand, EraseCommand } from './command';

class CommandGenerator {
  canvasCommandStream: Subject<DrawCommand | EraseCommand>;

  constructor() {
    this.canvasCommandStream = new Subject<DrawCommand | EraseCommand>();
  }

  draw(u: number, v: number, color: string): void {
    this.canvasCommandStream.next(new DrawCommand(u, v, color));
  }

  erase(u: number, v: number): void {
    this.canvasCommandStream.next(new EraseCommand(u, v));
  }
}

export default CommandGenerator;
