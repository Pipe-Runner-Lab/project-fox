import { Observable, merge } from 'rxjs';
import {
  ExtendedAddLayerAfter,
  ExtendedAddLayerBefore,
  DeleteLayer,
  HideLayer,
  ShowLayer,
  InsertLayerAfter,
  InsertLayerBefore,
  HistoryCommands
} from '../types/types';

type CommandHistoryProps = {
  drawCommand$: Observable<HistoryCommands>;
  layerCommand$: Observable<
    | ExtendedAddLayerAfter
    | ExtendedAddLayerBefore
    | DeleteLayer
    | HideLayer
    | ShowLayer
    | InsertLayerAfter
    | InsertLayerBefore
  >;
};

type Command =
  | HistoryCommands
  | ExtendedAddLayerAfter
  | ExtendedAddLayerBefore
  | DeleteLayer
  | HideLayer
  | ShowLayer
  | InsertLayerAfter
  | InsertLayerBefore;

class CommandHistory {
  redoStack: Command[] = [];

  constructor({ drawCommand$, layerCommand$ }: CommandHistoryProps) {
    merge(drawCommand$, layerCommand$).subscribe({
      next: (command) => {
        console.log(command);
        this.redoStack.push(command);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  cleanUp(): void {
    console.info('clean up for command history called');
  }
}

export default CommandHistory;
