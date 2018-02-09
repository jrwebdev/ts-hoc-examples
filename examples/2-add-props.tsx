import * as React from 'react';
import * as ReactDOM from 'react-dom';

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

export interface InjectedBlueBackgroundProps {
  style?: React.CSSProperties;
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
    P & WithBlueBackgroundProps
  > {
    render() {
      return (
        <UnwrappedComponent
          {...this.props}
          style={Object.assign({}, this.props.style, {
            backgroundColor: getBlueShade(this.props.shade),
          })}
        />
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
