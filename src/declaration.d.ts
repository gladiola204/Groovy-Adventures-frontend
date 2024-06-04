export {}; // Zapewnia, że plik jest traktowany jako moduł
declare global {
  interface Window {
    initAutocomplete?: () => void;
  }
}