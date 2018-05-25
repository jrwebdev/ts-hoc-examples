import * as React from 'react';

const LoadingSpinner = () => null;

interface WithLoadingProps {
  loading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLoading extends React.Component<P & WithLoadingProps> {
    render() {
      const { loading, ...props } = this.props as WithLoadingProps;
      return loading ? <LoadingSpinner /> : <Component {...props} />;
    }
  };

const Component = () => null;

const ComponentWithLoading = withLoading(Component);
const component = <ComponentWithLoading loading={false} />;
