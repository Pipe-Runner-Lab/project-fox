import React from 'react';
import PixelDustApi, { LayerMetaData, InstrumentType } from '../core/pixel-dust-api';

type PixelDustReactProps = {
  foregroundColor: string;
  backgroundColor: string;
  instrument: InstrumentType;
  onLayerStackChange: (layerStack: LayerMetaData[]) => void;
  onActiveLayerChange: (layer: LayerMetaData | null) => void;
};

type PixelDustReactState = Record<string, undefined>;

class PixelDustReact extends React.Component<PixelDustReactProps, PixelDustReactState> {
  pixelDustApi: PixelDustApi | undefined;

  constructor(props: PixelDustReactProps) {
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

  shouldComponentUpdate(nextProps: PixelDustReactProps): boolean {
    const { foregroundColor, backgroundColor, instrument } = this.props;
    if (foregroundColor !== nextProps.foregroundColor) {
      this.pixelDustApi?.setForegroundColor(nextProps.foregroundColor);
    }
    if (backgroundColor !== nextProps.backgroundColor) {
      this.pixelDustApi?.setBackgroundColor(nextProps.backgroundColor);
    }
    if (instrument !== nextProps.instrument) {
      this.pixelDustApi?.setInstrumentType(nextProps.instrument);
    }
    return false;
  }

  componentWillUnmount(): void {
    this.pixelDustApi?.cleanUp();
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

export default PixelDustReact;
