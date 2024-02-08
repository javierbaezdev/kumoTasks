import { Box, Flex, Image, Text } from '@chakra-ui/react'
import img from '@/assets/404.png'
import { SimpleButton } from '../components/buttons'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Flex
      w='full'
      h='full'
      justify='center'
      align='center'
    >
      <Flex
        justify='center'
        align='center'
        p={2}
        gap={10}
      >
        <Flex
          textAlign='center'
          direction='column'
          gap={4}
        >
          <Box>
            <Text fontSize='4xl'>404</Text>
            <Text fontSize='sm'>Contenido no encontrado</Text>
          </Box>
          <SimpleButton
            variant='outline'
            onClick={() => navigate('/')}
          >
            Volver al Inicio
          </SimpleButton>
        </Flex>
        <Image
          objectFit='contain'
          borderRadius='full'
          boxSize='200px'
          src={img}
          filter='grayscale(80%)'
        />
      </Flex>
    </Flex>
  )
}

export default NotFound
