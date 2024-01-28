import { DARK_MODE, GeneralColors, LIGHT_MODE } from '@/theme/combinedColors'
import { ColorsShadesMode } from '@/theme/types'
import { useColorMode } from '@chakra-ui/react'

const colorsModeDict: Record<string, any> = {
  light: LIGHT_MODE,
  dark: DARK_MODE,
}

export const GET_COLORS_THEME = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const colors: GeneralColors & ColorsShadesMode = colorsModeDict[colorMode]

  return { colorMode, toggleColorMode, colors }
}
