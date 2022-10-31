export const checkDefined = (value: any): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  return true;
};
