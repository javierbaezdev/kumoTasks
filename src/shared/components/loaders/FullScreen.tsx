import { GET_COLORS_THEME } from '@/shared/constants'
import { COMBINED_COLORS } from '@/theme/combinedColors'
import { Flex } from '@chakra-ui/react'
import { leapfrog } from 'ldrs'

const FullScreen = () => {
  leapfrog.register()
  const { colorMode } = GET_COLORS_THEME()
  return (
    <Flex
      w='full'
      h='full'
      direction='column'
      justify='center'
      align='center'
    >
      <l-leapfrog
        size='60'
        speed='2.5'
        color={
          colorMode === 'light'
            ? COMBINED_COLORS.mediumPurple[500]
            : COMBINED_COLORS.mediumPurple[200]
        }
      />
    </Flex>
  )
}

export default FullScreen
