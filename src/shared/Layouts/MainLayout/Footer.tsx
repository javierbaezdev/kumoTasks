import { Flex } from '@chakra-ui/react'
import { useMainLayoutStore } from './store'

const Footer = () => {
  const collapse = useMainLayoutStore((store) => store.collapse)

  return (
    <Flex
      gap={2}
      justify={!collapse ? 'center' : undefined}
    ></Flex>
  )
}

export default Footer
