import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import '@fontsource-variable/onest'
import { lightMode } from './lightMode'
import { darkMode } from './darkMode'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  styles: {
    global: {
      'html, body': {
        backgroundColor: mode(lightMode.primary[400], darkMode.primary[400]),
        height: '100%',
        width: '100%',
        padding: 0,
        margin: 0,
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
    },
  },
  fonts: {
    body: "'Onest Variable', sans-serif",
    heading: "'Onest Variable', sans-serif",
  },
  colors: mode(lightMode, darkMode),
}

const customTheme = extendTheme({ config })

export default customTheme
