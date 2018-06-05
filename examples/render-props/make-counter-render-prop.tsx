import * as React from 'react';

interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterProps {
  minValue?: number;
  maxValue?: number;
  children(props: InjectedCounterProps): JSX.Element;
}

interface MakeCounterState {
  value: number;
}

class MakeCounter extends React.Component<MakeCounterProps, MakeCounterState> {
  state: MakeCounterState = {
    value: 0,
  };

  increment = () => {
    this.setState(prevState => ({
      value:
        prevState.value === this.props.maxValue
          ? prevState.value
          : prevState.value + 1,
    }));
  };

  decrement = () => {
    this.setState(prevState => ({
      value:
        prevState.value === this.props.minValue
          ? prevState.value
          : prevState.value - 1,
    }));
  };

  render() {
    return this.props.children({
      value: this.state.value,
      onIncrement: this.increment,
      onDecrement: this.decrement,
    });
  }
}

export default MakeCounter;

// interface CounterProps {
//   style: React.CSSProperties;
//   minValue?: number;
//   maxValue?: number;
// }

// const Counter = (props: CounterProps) => (
//   <MakeCounter minValue={props.minValue} maxValue={props.maxValue}>
//     {injectedProps => (
//       <div style={props.style}>
//         <button onClick={injectedProps.onDecrement}> - </button>
//         {injectedProps.value}
//         <button onClick={injectedProps.onIncrement}> + </button>
//       </div>
//     )}
//   </MakeCounter>
// );

// interface CounterProps {
//   style: React.CSSProperties;
//   value: number;
//   minCounterValue?: number;
//   maxCounterValue?: number;
// }

// const Counter = (props: CounterProps) => (
//   <MakeCounter
//     minValue={props.minCounterValue}
//     maxValue={props.maxCounterValue}
//   >
//     {injectedProps => (
//       <div>
//         <div>Some other value: {props.value}</div>
//         <div style={props.style}>
//           <button onClick={injectedProps.onDecrement}> - </button>
//           {injectedProps.value}
//           <button onClick={injectedProps.onIncrement}> + </button>
//         </div>
//         {props.minCounterValue !== undefined ? (
//           <div>Min value - {props.minCounterValue}</div>
//         ) : null}
//         {props.maxCounterValue !== undefined ? (
//           <div>Min value - {props.maxCounterValue}</div>
//         ) : null}
//       </div>
//     )}
//   </MakeCounter>
// );

interface CounterProps extends InjectedCounterProps {
  style: React.CSSProperties;
}

const Counter = (props: CounterProps) => (
  <div style={props.style}>
    <button onClick={props.onDecrement}> - </button>
    {props.value}
    <button onClick={props.onIncrement}> + </button>
  </div>
);

interface WrappedCounterProps extends CounterProps {
  minValue?: number;
  maxValue?: number;
}

const WrappedCounter = ({
  minValue,
  maxValue,
  ...props
}: WrappedCounterProps) => (
  <MakeCounter minValue={minValue} maxValue={maxValue}>
    {injectedProps => <Counter {...props} {...injectedProps} />}
  </MakeCounter>
);
