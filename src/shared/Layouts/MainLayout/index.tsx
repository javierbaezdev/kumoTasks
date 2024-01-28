import { Flex, HStack, useColorModeValue } from '@chakra-ui/react'
import SideBar from './SideBar'
import { useMainLayoutStore } from './store'
import Header from './Header'
import { GET_IS_SMALL_SCREAM } from '@/shared/constant'
import { SimpleDrawer } from '@/shared/components/modals'

interface Props {
  children: JSX.Element
}

const MainLayout = ({ children }: Props) => {
  const bgAside = useColorModeValue('light.secondary.300', 'dark.secondary.300')
  const isSmallScream = GET_IS_SMALL_SCREAM()
  const { collapse, collapseMobile, onToggleMobile } = useMainLayoutStore(
    (store) => store
  )
  return (
    <HStack
      w='full'
      h='full'
      p={!isSmallScream ? 6 : 3}
    >
      {!isSmallScream ? (
        <Flex
          as='aside'
          w='full'
          h='full'
          maxW={collapse ? 350 : 100}
          bg={bgAside}
          p='6'
          direction='column'
          justify='space-between'
          borderRadius='3xl'
        >
          <SideBar />
        </Flex>
      ) : (
        <SimpleDrawer
          isOpen={collapseMobile}
          onClose={onToggleMobile}
          placement='left'
          size='full'
        >
          <SideBar />
        </SimpleDrawer>
      )}
      <Flex
        as='main'
        w='full'
        h='full'
        bg={bgAside}
        direction='column'
        position='relative'
        borderRadius='3xl'
        overflow='hidden'
      >
        <Header />
        {children}
      </Flex>
    </HStack>
  )
}

export default MainLayout
