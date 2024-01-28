import { useColorMode } from '@chakra-ui/react'
import { useMediaQuery } from 'react-responsive'

export const GET_COLORS_THEME = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return { colorMode, toggleColorMode }
}

export const GET_IS_SMALL_SCREAM = () => {
  return useMediaQuery({
    query: '(max-width: 600px)',
  })
}
