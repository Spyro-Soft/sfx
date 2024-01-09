export function validateName(value: string): string | boolean {
  const matched = value.match(/^[a-zA-Z0-9_-]*$/gi);
  if (!matched) {
    return 'Only A-Z, a-z, 0-9, -, and _ allowed. Please insert data once again.';
  }

  const correctLength = value.length <= 128;
  if (!correctLength) {
    return 'Pick a name with max 128 characters. Please insert data once again.';
  }

  return true;
}
