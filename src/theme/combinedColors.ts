import { darkMode } from './darkMode'
import { lightMode } from './lightMode'
import { ColorShadesCompleted } from './types'

export interface GeneralColors {
  mediumPurple: ColorShadesCompleted
  javaScript: ColorShadesCompleted
}

export const generalColors: GeneralColors = {
  mediumPurple: {
    '50': '#c9c6f5',
    '100': '#c0baf3',
    '200': '#b0a5ee',
    '300': '#998ae5',
    '400': '#896cda',
    '500': '#7b54cf',
    '600': '#7340ba',
    '700': '#64458c',
    '800': '#4a3768',
    '900': '#3a2e4d',
    '950': '#34214f',
  },
  javaScript: {
    '50': '#fcfcea',
    '100': '#faf7c7',
    '200': '#f6ed92',
    '300': '#f0db4f',
    '400': '#eac925',
    '500': '#dab118',
    '600': '#bc8a12',
    '700': '#966412',
    '800': '#7d5016',
    '900': '#6a4119',
    '950': '#3e230a',
  },
}

export const COMBINED_COLORS = {
  ...generalColors,
  light: {
    ...lightMode,
  },
  dark: {
    ...darkMode,
  },
}
