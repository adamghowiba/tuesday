import { CSSProperties } from 'react';

const SHORTHAND_MAP = {
  m: 'margin',
  mb: 'marginBottom',
  mt: 'marginTop',
  mx: ['marginLeft', 'marginRight'],
  my: ['marginTop', 'marginBottom'],
  p: 'padding',
  pb: 'paddingBottom',
  pt: 'paddingTop',
  pl: 'paddingLeft',
  mw: 'minWidth',
  mh: 'minHeight',
  h: 'height',
  w: 'width',
  px: ['paddingLeft', 'paddingRight'],
  py: ['paddingTop', 'paddingBottom'],
} as const;

type ShorthandSystemProperties = keyof typeof SHORTHAND_MAP;

export type SystemProperties = Partial<
  Record<ShorthandSystemProperties, string | number> &
    Pick<
      CSSProperties,
      | 'flex'
      | 'margin'
      | 'border'
      | 'borderBottom'
      | 'borderTop'
      | 'borderLeft'
      | 'borderRight'
      | 'display'
      | 'alignItems'
      | 'alignSelf'
      | 'justifyItems'
      | 'justifySelf'
      | 'justifyContent'
      | 'marginRight'
      | 'marginLeft'
      | 'marginTop'
      | 'marginBottom'
      | 'margin'
      | 'padding'
      | 'paddingLeft'
      | 'paddingRight'
      | 'paddingTop'
      | 'paddingBottom'
      | 'paddingTop'
      | 'flex'
      | 'backgroundColor'
      | 'position'
      | 'left'
      | 'right'
      | 'top'
      | 'bottom'
      | 'height'
      | 'width'
      | 'minHeight'
      | 'minWidth'
    >
>;

export const getSystemProperties = (props: SystemProperties) => {
  return Object.entries(props).reduce((acc, [key, value]) => {
    if (key in SHORTHAND_MAP) {
      const prop = SHORTHAND_MAP?.[key];

      if (Array.isArray(prop)) {
        prop.map((key) => (acc[key] = value));
        return acc;
      } else {
        acc[prop] = value;
        return acc;
      }
    }

    acc[key] = value;
    return acc;
  }, {});
};
