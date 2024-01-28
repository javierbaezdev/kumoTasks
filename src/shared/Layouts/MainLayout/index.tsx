import { Flex, HStack } from '@chakra-ui/react'
import { GET_COLORS_THEME } from '@/shared/constant'
import SideBar from './SideBar'
import { useMainLayoutStore } from './store'

interface Props {
  children: JSX.Element
}

const MainLayout = ({ children }: Props) => {
  const { colors } = GET_COLORS_THEME()
  const collapse = useMainLayoutStore((store) => store.collapse)
  return (
    <HStack
      w='full'
      h='full'
      p={6}
    >
      <Flex
        as='aside'
        w='full'
        h='full'
        maxW={collapse ? 350 : 100}
        bg={colors.secondary[300]}
        p='6'
        direction='column'
        justify='space-between'
        borderRadius='3xl'
      >
        <SideBar />
      </Flex>
      <Flex
        as='main'
        w='full'
        h='full'
        bg={colors.secondary[300]}
        align='center'
        justify='center'
        direction='column'
        position='relative'
        borderRadius='3xl'
      >
        {children}
      </Flex>
    </HStack>
  )
}

export default MainLayout
