import '@fontsource-variable/onest'
import { ThemeConfig, extendTheme } from '@chakra-ui/react'
import { Styles, SystemStyleObject, mode } from '@chakra-ui/theme-tools'
import {
  DARK_MODE,
  GeneralColors,
  LIGHT_MODE,
  generalColors,
} from './combinedColors'

const scrollbarStyles = (props: SystemStyleObject) => ({
  '&::-webkit-scrollbar': {
    width: '16px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: mode(
      LIGHT_MODE.primary[200],
      DARK_MODE.primary[300]
    )(props),
    borderRadius: '9px',
    border: '4px solid transparent',
    backgroundClip: 'content-box',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-track-piece': {
    backgroundColor: 'transparent',
  },
})

const styles: Styles = {
  global: (props) => ({
    'html, body': {
      backgroundColor: mode(
        LIGHT_MODE.primary[200],
        DARK_MODE.primary[300]
      )(props),
      height: '100vh',
      width: '100vw',
      padding: 0,
      margin: 0,
    },
    '#root': {
      height: '100vh',
      width: '100vw',
    },
    ...scrollbarStyles(props),
  }),
}

const fonts = {
  body: "'Onest Variable', sans-serif",
  heading: "'Onest Variable', sans-serif",
}

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = generalColors

const defaultTheme = {
  styles,
  fonts,
  colors,
  config,
}

const customTheme = extendTheme(defaultTheme)

export default customTheme
