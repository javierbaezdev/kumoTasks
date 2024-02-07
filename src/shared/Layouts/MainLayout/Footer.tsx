import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import { useMainLayoutStore } from './store'
import { SimpleIconButton } from '@/shared/components/buttons'
import {
  CircleArrowLeft,
  CircleArrowRight,
  MoonStars,
  SunHigh,
} from '@/shared/Icons'
import {
  GET_COLORS_THEME,
  GET_IS_SMALL_SCREAM,
  GRADIENTS_BG,
} from '@/shared/constants'

const Footer = () => {
  const { collapse, onToggle, onToggleMobile } = useMainLayoutStore(
    (store) => store
  )
  const { colorMode, toggleColorMode } = GET_COLORS_THEME()
  const isSmallScream = GET_IS_SMALL_SCREAM()
  const bg = useColorModeValue(GRADIENTS_BG.LIGHT, GRADIENTS_BG.DARK)

  const onToggleOptions = () => {
    if (isSmallScream) {
      onToggleMobile()
    }
    if (!isSmallScream) {
      onToggle()
    }
  }

  return (
    <Flex
      gap={2}
      justify={!collapse ? 'center' : 'space-evenly'}
      bg={bg}
      borderRadius={8}
      p={2}
      direction={collapse ? 'row' : 'column'}
    >
      <Box>
        <SimpleIconButton
          aria-label='theme mode'
          icon={colorMode === 'dark' ? <SunHigh /> : <MoonStars />}
          onClick={toggleColorMode}
          bg='transparent'
          _hover={{ bg: 'transparent', color: 'mediumPurple.300' }}
        />
      </Box>
      <Box>
        <SimpleIconButton
          icon={collapse ? <CircleArrowLeft /> : <CircleArrowRight />}
          aria-label='onToggle'
          onClick={() => onToggleOptions()}
          bg='transparent'
          _hover={{ bg: 'transparent', color: 'mediumPurple.300' }}
        />
      </Box>
    </Flex>
  )
}

export default Footer
