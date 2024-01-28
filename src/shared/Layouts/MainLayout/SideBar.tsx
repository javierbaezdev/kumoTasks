import { Box } from '@chakra-ui/react'
import Logo from './Logo'
import Navigation from './Navigation'
import Footer from './Footer'

const SideBar = () => {
  return (
    <>
      <Box w='full'>
        <Logo />
        <Navigation />
      </Box>
      <Footer />
    </>
  )
}

export default SideBar
