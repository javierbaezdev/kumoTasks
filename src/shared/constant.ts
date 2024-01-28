import { DARK_MODE, LIGHT_MODE } from '@/theme/combinedColors'
import { useColorMode } from '@chakra-ui/react'

const colorsModeDict: Record<string, any> = {
  light: LIGHT_MODE,
  dark: DARK_MODE,
}

export const GET_COLORS_THEME = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const colors = colorsModeDict[colorMode]

  return { colorMode, toggleColorMode, colors }
}
