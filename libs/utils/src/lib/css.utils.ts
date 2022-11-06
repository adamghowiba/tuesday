/**
 *
 * @param value value to parse
 * @param defaultUnit which default unit to use if parsed to a CSS string
 * @returns
 */
export const parseUnit = (
  value: string | number,
  defaultUnit: 'px' | 'em' | 'rem' | 'percentage' = 'px'
) => {
  if (typeof value === 'string') return value;

  return `${value}${defaultUnit === 'percentage' ? '%' : defaultUnit}`;
};
