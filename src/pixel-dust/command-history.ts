import { Observable, merge } from 'rxjs';
import {
  AddLayerAfter,
  AddLayerBefore,
  DeleteLayer,
  ExtendedPenCommand,
  ExtendedEraseCommand
} from './types';

type CommandHistoryProps = {
  drawCommand$: Observable<ExtendedPenCommand | ExtendedEraseCommand>;
  layerCommand$: Observable<AddLayerAfter | AddLayerBefore | DeleteLayer>;
};

type Command =
  | ExtendedPenCommand
  | ExtendedEraseCommand
  | AddLayerAfter
  | AddLayerBefore
  | DeleteLayer;

class CommandHistory {
  redoStack: Command[] = [];

  constructor({ drawCommand$, layerCommand$ }: CommandHistoryProps) {
    merge(drawCommand$, layerCommand$).subscribe((command) => {
      this.redoStack.push(command);
    });
  }
}

export default CommandHistory;
