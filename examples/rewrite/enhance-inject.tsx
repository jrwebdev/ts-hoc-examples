import * as React from 'react';
import { Subtract } from 'utility-types';

export interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterProps {
  minValue?: number;
  maxValue?: number;
}

interface MakeCounterState {
  value: number;
}

const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) =>
  class MakeCounter extends React.Component<
    Subtract<P, InjectedCounterProps> & MakeCounterProps,
    MakeCounterState
  > {
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
      const { minValue, maxValue, ...props } = this.props as MakeCounterProps;
      return (
        <Component
          {...props}
          value={this.state.value}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
      );
    }
  };

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
