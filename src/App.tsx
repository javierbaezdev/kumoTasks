import { Flex, Button, useColorMode } from '@chakra-ui/react'

function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex
      justify='center'
      align='center'
    >
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </Flex>
  )
}

export default App
