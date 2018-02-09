import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Subtract } from 'utility-types';

/* ------------------------------------------------------------------------- */
// Unwrapped component

interface HelloProps extends InjectedBlueBackgroundProps {
  style?: React.CSSProperties;
  name: string;
}

const Hello = ({ style, name }: HelloProps) => (
  <div style={style}>Hello, {name}!</div>
);

/* ------------------------------------------------------------------------- */
// HOC

type ColorShade = 'light' | 'dark';

interface InjectedBlueBackgroundProps {
  backgroundColor: string;
}

interface WithBlueBackgroundProps {
  shade?: ColorShade;
}

const getBlueShade = (shade?: ColorShade) => {
  switch (shade) {
    case 'dark':
      return 'navy';
    case 'light':
      return 'skyblue';
    default:
      return 'blue';
  }
};

const withBlueBackground = <P extends InjectedBlueBackgroundProps>(
  UnwrappedComponent: React.ComponentType<P>
) =>
  class WithBlueBackground extends React.Component<
    Subtract<P, InjectedBlueBackgroundProps> & WithBlueBackgroundProps
  > {
    render() {
      const { shade, ...props } = this.props;
      return (
        <UnwrappedComponent {...props} backgroundColor={getBlueShade(shade)} />
      );
    }
  };

/* ------------------------------------------------------------------------- */
// Usage

const BlueHello = withBlueBackground(Hello);
ReactDOM.render(
  <BlueHello name="Bob" shade="dark" style={{ fontWeight: 'bold' }} />,
  document.getElementById('app')
);
