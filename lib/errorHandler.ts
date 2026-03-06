// frontend/lib/errorHandler.ts

// Define error types
export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  CONVERSATION_ERROR = 'CONVERSATION_ERROR',
  RENDER_ERROR = 'RENDER_ERROR',
}

// Define error response interface
export interface ErrorResponse {
  type: ErrorType;
  message: string;
  details?: any;
  timestamp: Date;
}

// Error handler class
export class ErrorHandler {
  static handle(error: any, errorType?: ErrorType): ErrorResponse {
    // Determine error type if not provided
    if (!errorType) {
      if (error.message.includes('Network Error')) {
        errorType = ErrorType.NETWORK_ERROR;
      } else if (error.response?.status === 401) {
        errorType = ErrorType.AUTHENTICATION_ERROR;
      } else if (error.response?.status >= 500) {
        errorType = ErrorType.SERVER_ERROR;
      } else {
        errorType = ErrorType.VALIDATION_ERROR;
      }
    }

    // Create error response
    const errorResponse: ErrorResponse = {
      type: errorType,
      message: this.getErrorMessage(error, errorType),
      details: error,
      timestamp: new Date(),
    };

    // Log error for debugging
    console.error(`[${errorResponse.type}] ${errorResponse.message}`, errorResponse.details);

    return errorResponse;
  }

  private static getErrorMessage(error: any, errorType: ErrorType): string {
    switch (errorType) {
      case ErrorType.NETWORK_ERROR:
        return 'Network error occurred. Please check your connection.';
      case ErrorType.AUTHENTICATION_ERROR:
        return 'Authentication failed. Please log in again.';
      case ErrorType.SERVER_ERROR:
        return 'Server error occurred. Please try again later.';
      case ErrorType.CONVERSATION_ERROR:
        return 'Conversation error occurred. Starting a new conversation.';
      case ErrorType.RENDER_ERROR:
        return 'An unexpected error occurred in the UI.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }

  // Specific error handlers
  static handleNetworkError(error: any): ErrorResponse {
    return this.handle(error, ErrorType.NETWORK_ERROR);
  }

  static handleValidationError(error: any): ErrorResponse {
    return this.handle(error, ErrorType.VALIDATION_ERROR);
  }

  static handleAuthenticationError(error: any): ErrorResponse {
    return this.handle(error, ErrorType.AUTHENTICATION_ERROR);
  }

  static handleServerError(error: any): ErrorResponse {
    return this.handle(error, ErrorType.SERVER_ERROR);
  }

  static handleConversationError(error: any): ErrorResponse {
    return this.handle(error, ErrorType.CONVERSATION_ERROR);
  }
}

// Error boundary component interface
export interface ErrorBoundaryState {
  hasError: boolean;
  error: ErrorResponse | null;
}

export const initialErrorBoundaryState: ErrorBoundaryState = {
  hasError: false,
  error: null,
};
