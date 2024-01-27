import '@fontsource-variable/onest'
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { DARK_MODE, LIGHT_MODE } from './combinedColors'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  styles: {
    global: {
      'html, body': {
        backgroundColor: mode(LIGHT_MODE.primary[200], DARK_MODE.primary[950]),
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
  colors: mode(LIGHT_MODE, DARK_MODE),
}

const customTheme = extendTheme({ config })

export default customTheme
