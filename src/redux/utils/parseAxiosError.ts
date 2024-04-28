import { AxiosError } from 'axios';

function parseAxiosError(error: AxiosError): string {
  // Sprawdź, czy błąd pochodzi od odpowiedzi HTTP
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 400:
        return 'Invalid request. Please check your input and try again.'
        // return {
        //   message: 'Invalid request. Please check your input and try again.',
        //   code: 'BAD_REQUEST'
        // };
      case 401:
        return 'You are not authorized. Please login and try again.';
        // return {
        //   message: 'You are not authorized. Please login and try again.',
        //   code: 'UNAUTHORIZED'
        // };
      case 500:
        return 'Server error. Please try again later.'
        // return {
        //   message: 'Server error. Please try again later.',
        //   code: 'SERVER_ERROR'
        // };
      default:
        return 'An unexpected error occurred. Please try again later.'
        // return {
        //   message: 'An unexpected error occurred. Please try again later.',
        //   code: 'UNKNOWN_ERROR'
        // };
    }
  } else if (error.request) {
    // Błąd związany z problemami sieciowymi, żądanie zostało wysłane, ale nie otrzymano odpowiedzi
    return 'Network error. Please check your connection and try again.'
    // return {
    //   message: 'Network error. Please check your connection and try again.',
    //   code: 'NETWORK_ERROR'
    // };
  } else {
    // Błąd ustawienia lub inicjowania żądania
    return 'Request setup failed. Please try again.'
    // return {
    //   message: 'Request setup failed. Please try again.',
    //   code: 'REQUEST_ERROR'
    // };
  }
};

export default parseAxiosError;