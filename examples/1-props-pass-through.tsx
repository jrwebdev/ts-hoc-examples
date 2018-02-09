import * as React from 'react';
import * as ReactDOM from 'react-dom';

/* ------------------------------------------------------------------------- */
// Unwrapped component

interface HelloProps {
  style?: React.CSSProperties;
  name: string;
}

const Hello = ({ style, name }: HelloProps) => (
  <div style={style}>Hello, {name}!</div>
);

/* ------------------------------------------------------------------------- */
// HOC

interface WithBlueBackgroundProps {
  style?: React.CSSProperties;
}

const withBlueBackground = <P extends WithBlueBackgroundProps>(
  UnwrappedComponent: React.ComponentType<P>
) =>
  class WithBlueBackground extends React.Component<P> {
    render() {
      return (
        <UnwrappedComponent
          {...this.props}
          style={Object.assign({}, this.props.style, {
            backgroundColor: 'blue',
          })}
        />
      );
    }
  };

/* ------------------------------------------------------------------------- */
// Usage

const BlueHello = withBlueBackground(Hello);
ReactDOM.render(
  <BlueHello name="Bob" style={{ fontWeight: 'bold' }} />,
  document.getElementById('app')
);
