import { useParams } from 'react-router-dom'
import { CirclePlus } from '@/shared/Icons'
import { Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { generateId } from '@/shared/utils/generate'
import { useBoardsStore } from '../store'

export const MIN_H = 50
export const MIN_W = 300

const NewColumnButton = () => {
  const { projectKey } = useParams()
  const addColumn = useBoardsStore((store) => store.addColumn)
  const bgCard = useColorModeValue('light.primary.100', 'dark.primary.300')
  const bgHover = useColorModeValue('light.secondary.200', 'dark.secondary.200')

  const addNewColumn = () => {
    if (projectKey) {
      addColumn({ key: generateId(), name: 'nueva columna', projectKey })
    }
  }
  return (
    <Flex
      bg={bgCard}
      p={2}
      borderRadius={8}
      gap={2}
      minW={MIN_W}
      minH={MIN_H}
      maxH={MIN_H}
      cursor='pointer'
      _hover={{ bg: bgHover }}
      onClick={() => addNewColumn()}
      align='center'
      justify='center'
    >
      <Flex
        align='center'
        gap={2}
      >
        <Icon fontSize={28}>
          <CirclePlus />
        </Icon>
        <Text
          noOfLines={[1]}
          fontSize='1.2rem'
        >
          Agregar Nueva Columna
        </Text>
      </Flex>
    </Flex>
  )
}

export default NewColumnButton
