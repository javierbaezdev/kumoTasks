import { SimpleIconButton } from '@/shared/components/buttons'
import { Box, Flex } from '@chakra-ui/react'
import { useMainLayoutStore } from '../store'
import {
  CircleArrowLeft,
  CircleArrowRight,
  MoonStars,
  SunHigh,
} from '@/shared/Icons'
import { GET_COLORS_THEME, GET_IS_SMALL_SCREAM } from '@/shared/constant'

const Header = () => {
  const { collapse, onToggle, onToggleMobile } = useMainLayoutStore(
    (store) => store
  )
  const { colorMode, toggleColorMode } = GET_COLORS_THEME()
  const isSmallScream = GET_IS_SMALL_SCREAM()

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
      w='full'
      px={4}
      py={2}
      borderBlockEnd='1px solid'
      mb={4}
      h='55px'
      justify='space-between'
      align='center'
      borderColor='mediumPurple.300'
    >
      <Box>
        <SimpleIconButton
          icon={collapse ? <CircleArrowLeft /> : <CircleArrowRight />}
          aria-label='onToggle'
          onClick={() => onToggleOptions()}
          bg='transparent'
          _hover={{ bg: 'transparent', color: 'mediumPurple.300' }}
        />
      </Box>
      <Box>
        <SimpleIconButton
          aria-label='theme mode'
          icon={colorMode === 'dark' ? <SunHigh /> : <MoonStars />}
          onClick={toggleColorMode}
          bg='transparent'
          _hover={{ bg: 'transparent', color: 'mediumPurple.300' }}
        />
      </Box>
    </Flex>
  )
}

export default Header
