import { darkMode } from './darkMode'
import { lightMode } from './lightMode'

const generalColors = {
  cornflowerBlue: {
    '50': '#ecf4ff',
    '100': '#ddeaff',
    '200': '#c2d8ff',
    '300': '#9cbdff',
    '400': '#7597ff',
    '500': '#6680ff',
    '600': '#3647f5',
    '700': '#2a37d8',
    '800': '#2531ae',
    '900': '#263289',
    '950': '#161b50',
  },
  javascript: {
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

export const DARK_MODE = {
  ...generalColors,
  ...darkMode,
}

export const LIGHT_MODE = {
  ...generalColors,
  ...lightMode,
}
