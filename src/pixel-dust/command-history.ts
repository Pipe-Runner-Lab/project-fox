import { Observable, merge } from 'rxjs';
import {
  ExtendedAddLayerAfter,
  ExtendedAddLayerBefore,
  DeleteLayer,
  ExtendedPenCommand,
  ExtendedEraseCommand,
  HideLayer,
  ShowLayer,
  InsertLayerAfter,
  InsertLayerBefore
} from './types';

type CommandHistoryProps = {
  drawCommand$: Observable<ExtendedPenCommand | ExtendedEraseCommand>;
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
  | ExtendedPenCommand
  | ExtendedEraseCommand
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
        // console.log(command);
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
