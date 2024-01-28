import LOGO_FULL_DARK from '@/assets/logo/full_logo_v2.svg'
import LOGO_FULL_LIGHT from '@/assets/logo/full_logo.svg'
import { Box, Flex, Image } from '@chakra-ui/react'
import { GET_COLORS_THEME } from '@/shared/constant'
import { useMainLayoutStore } from './store'
import { SimpleIconButton } from '@/shared/components/buttons'
import { CircleArrowLeft, CircleArrowRight } from '@/shared/Icons'
const Logo = () => {
  const { colorMode, colors } = GET_COLORS_THEME()
  const { collapse, onToggle } = useMainLayoutStore((store) => store)
  return (
    <Flex
      w='full'
      align='center'
      justify='center'
      gap={4}
    >
      {collapse && (
        <Box>
          <Image
            src={colorMode === 'dark' ? LOGO_FULL_DARK : LOGO_FULL_LIGHT}
          />
        </Box>
      )}
      <Box>
        <SimpleIconButton
          icon={collapse ? <CircleArrowLeft /> : <CircleArrowRight />}
          aria-label='onToggle'
          onClick={() => onToggle()}
          bg='transparent'
          _hover={{ bg: 'transparent', color: colors.mediumPurple[300] }}
        />
      </Box>
    </Flex>
  )
}

export default Logo
