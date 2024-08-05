export function parseChecked(checked?: string): boolean | undefined {
  switch (checked) {
    case 'false':
      return false;
    case 'true':
      return true;
    default:
      return undefined;
  }
}
