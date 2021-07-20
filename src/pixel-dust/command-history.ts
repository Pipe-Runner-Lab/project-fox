import { Observable, merge } from 'rxjs';
import { PenCommand, EraserCommand } from './command-generator';
import { AddLayerAfter, AddLayerBefore, DeleteLayer } from './layer-manager';

type ExtendedPenCommand = PenCommand & {
  activeLayerUuid: string;
};

type ExtendedEraseCommand = EraserCommand & {
  activeLayerUuid: string;
};

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
