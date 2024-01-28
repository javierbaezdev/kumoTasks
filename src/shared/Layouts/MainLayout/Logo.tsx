import LOGO_FULL_DARK from '@/assets/logo/full_logo_v2.svg'
import LOGO_MIN_DARK from '@/assets/logo/min_logo_v2.svg'
import LOGO_FULL_LIGHT from '@/assets/logo/full_logo.svg'
import LOGO_MIN_LIGHT from '@/assets/logo/min_logo.svg'
import { Box, Flex, Image } from '@chakra-ui/react'
import { GET_COLORS_THEME } from '@/shared/constant'
import { useMainLayoutStore } from './store'
const Logo = () => {
  const { colorMode } = GET_COLORS_THEME()
  const { collapse } = useMainLayoutStore((store) => store)
  return (
    <Flex
      w='full'
      align='center'
      justify='center'
      gap={4}
    >
      <Box>
        {collapse ? (
          <Image
            src={colorMode === 'dark' ? LOGO_FULL_DARK : LOGO_FULL_LIGHT}
          />
        ) : (
          <Image src={colorMode === 'dark' ? LOGO_MIN_DARK : LOGO_MIN_LIGHT} />
        )}
      </Box>
    </Flex>
  )
}

export default Logo
