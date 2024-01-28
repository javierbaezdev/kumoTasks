import { Flex, Button } from '@chakra-ui/react'
import { GET_COLORS_THEME } from '@/shared/constant'

function App() {
  const { colorMode, toggleColorMode } = GET_COLORS_THEME()
  return (
    <>
      asdasd
      <Flex
        justify='center'
        align='center'
        direction='column'
      >
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
        Hola
      </Flex>
    </>
  )
}

export default App
