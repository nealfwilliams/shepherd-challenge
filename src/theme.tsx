
export type Color =
  | 'primary'
  | 'light'
  | 'textDark'
  | 'textMedium'
  | 'textLight'
  | 'textInverted'
  | 'backgroundLight'
  | 'textOnPrimary'
  | 'faint';

type Colors = {
  [key in Color]: string;
};

export const colors: Colors = {
  primary: '#009987',
  light: '#b3ffe1',
  textDark: '#333333',
  textMedium: '#555555',
  textLight: '#888888',
  textOnPrimary: '#eeeeee',
  backgroundLight: '#eeeeee',
  textInverted: '#eeeeee',
  faint: '#f9f9f9'
}

type FontStyle = {
  fontSize: number;
  fontWeight: string;
  lineHeight?: number;
  color?: Color;
}

export type FontType = 
  | 'headingMedium'
  | 'headingLarge'
  | 'labelSmall'
  | 'labelMedium'
  | 'textMedium'
  | 'textLarge'

type FontStyles = {
  [key in FontType]: FontStyle
};

export const fontStyles: FontStyles = {
  labelSmall: {
    fontSize: 12,
    fontWeight: '600',
    color: 'textMedium'
  },
  labelMedium: {
    fontSize: 14,
    fontWeight: '600'
  },
  textMedium: {
    fontSize: 14,
    fontWeight: '400'
  },
  textLarge: {
    fontSize: 20,
    fontWeight: '400'
  },
  headingMedium: {
    fontSize: 16,
    fontWeight: '600'
  },
  headingLarge: {
    fontSize: 24,
    fontWeight: '600'
  }
}

export type Theme = {
  baseSpace: number,
  colors: Colors
  fonts: FontStyles
}

export const theme = {
  baseSpace: 4,
  colors,
  fonts: fontStyles
}