import React from 'react';
import PixelDustApi, { Layer } from './pixel-dust-api';

type PixelDustBoardProps = {
  foregroundColor: string;
  backgroundColor: string;
  onLayerStackChange: (layerStack: Layer[]) => void;
  onActiveLayerChange: (layer: Layer | null) => void;
};

type PixelDustBoardState = Record<string, undefined>;

class PixelDustBoard extends React.Component<PixelDustBoardProps, PixelDustBoardState> {
  pixelDustApi: PixelDustApi | undefined;

  constructor(props: PixelDustBoardProps) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    const { onActiveLayerChange, onLayerStackChange } = this.props;

    const mountTarget = document.querySelector('.pixel-dust-react-binding');
    if (mountTarget) {
      this.pixelDustApi = new PixelDustApi({
        mountTarget: mountTarget as HTMLDivElement,
        activeLayerUpdateCB: onActiveLayerChange,
        layerStackUpdateCB: onLayerStackChange
      });
    } else {
      console.error('Mount target not found');
    }
  }

  shouldComponentUpdate(nextProps: PixelDustBoardProps): boolean {
    const { foregroundColor, backgroundColor } = this.props;
    if (foregroundColor !== nextProps.foregroundColor) {
      this.pixelDustApi?.setForegroundColor(nextProps.foregroundColor);
    }
    if (backgroundColor !== nextProps.backgroundColor) {
      this.pixelDustApi?.setBackgroundColor(nextProps.backgroundColor);
    }
    return false;
  }

  render(): JSX.Element {
    return (
      <div
        className="pixel-dust-react-binding"
        style={{
          height: '100%',
          width: '100%'
        }}
      />
    );
  }
}

export default PixelDustBoard;
