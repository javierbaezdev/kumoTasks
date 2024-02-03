import { ChakraProvider } from '@chakra-ui/react'
import customTheme from './theme'
import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RenderRoutes from './routes/renderRoutes'

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Suspense fallback={<>loading....</>}>
        <Router>
          <RenderRoutes />
        </Router>
      </Suspense>
    </ChakraProvider>
  )
}

export default App
