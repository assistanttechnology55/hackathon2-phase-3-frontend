// frontend/components/ErrorBoundary.tsx

import React from 'react';
import { initialErrorBoundaryState, ErrorBoundaryState, ErrorType } from '../lib/errorHandler';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: any }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialErrorBoundaryState;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: {
        type: ErrorType.RENDER_ERROR,
        message: 'An unexpected error occurred in the UI',
        details: error,
        timestamp: new Date(),
      },
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} />;
      }

      return (
        <div className="error-boundary p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-red-700 font-bold text-lg">Something went wrong</h2>
          <p className="text-red-600 mt-2">{this.state.error?.message}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => this.setState(initialErrorBoundaryState)}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
