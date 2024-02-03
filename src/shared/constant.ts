import { useColorMode } from '@chakra-ui/react'
import { useMediaQuery } from 'react-responsive'

export const NO_DATA = {
  description: 'Sin descripción 🤐',
}

export const GRADIENTS_BG = {
  DARK: 'linear-gradient(270deg, rgba(27,29,42,0.4761554279915091) 0%, rgba(12,15,29,1) 100%)',
  LIGHT:
    'linear-gradient(270deg, rgba(255,255,255,0.5713935232296043) 0%, rgba(229,231,244,1) 100%)',
}

export const GET_COLORS_THEME = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return { colorMode, toggleColorMode }
}

export const GET_IS_SMALL_SCREAM = () => {
  return useMediaQuery({
    query: '(max-width: 600px)',
  })
}
