import React from 'react';

const FormContext = React.createContext({
  generateErrorMessage: () => {},
  // Możesz dodać więcej współdzielonych funkcji lub stanów tutaj
});

export default FormContext;