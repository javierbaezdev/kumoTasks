import { MoonStars } from '@/shared/Icons'
import SunHigh from '@/shared/Icons/SunHigh'
import { SimpleIconButton } from '@/shared/components/buttons'
import { GET_COLORS_THEME } from '@/shared/constant'
import { Flex } from '@chakra-ui/react'
import { useMainLayoutStore } from './store'

const Footer = () => {
  const collapse = useMainLayoutStore((store) => store.collapse)
  const { colorMode, toggleColorMode } = GET_COLORS_THEME()
  return (
    <Flex
      gap={2}
      justify={!collapse ? 'center' : undefined}
    >
      <SimpleIconButton
        aria-label='theme mode'
        icon={colorMode === 'dark' ? <SunHigh /> : <MoonStars />}
        onClick={toggleColorMode}
      />
    </Flex>
  )
}

export default Footer
