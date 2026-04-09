import { useColorScheme as _useColorScheme } from 'react-native';

/**
 * A custom hook to get the current color scheme.
 * This can be extended to support custom theme logic if needed.
 */
export function useColorScheme() {
  return _useColorScheme();
}
