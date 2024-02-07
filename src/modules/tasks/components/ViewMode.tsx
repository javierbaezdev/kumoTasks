import { EditCircle } from '@/shared/Icons'
import { SimpleButton } from '@/shared/components/buttons'
import { TasksBoard } from '@/modules/tasks/types'
import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { NO_DATA } from '@/shared/constants'

interface Props {
  showEditMode: () => void
  task: TasksBoard
}

const ViewMode = ({ task, showEditMode }: Props) => {
  const borderColor = useColorModeValue(
    'light.primaryFull.500',
    'dark.primaryFull.400'
  )
  return (
    <Flex
      direction='column'
      gap={2}
      w='full'
    >
      <Flex
        w='full'
        gap={2}
        direction='column'
        border='1px solid'
        p={2}
        borderColor={borderColor}
        borderRadius={8}
      >
        <Text
          fontSize='lg'
          as='u'
          fontWeight={600}
        >
          Titulo:
        </Text>
        <Text
          fontSize='lg'
          noOfLines={[1, 2]}
        >
          {task.name}
        </Text>
      </Flex>

      <Flex
        w='full'
        gap={2}
        direction='column'
        border='1px solid'
        p={2}
        borderColor={borderColor}
        borderRadius={8}
      >
        <Text
          fontSize='lg'
          as='u'
          fontWeight={600}
        >
          Descripción:
        </Text>
        <Text
          fontSize='lg'
          noOfLines={[1, 2, 3, 4, 5, 6, 7]}
        >
          {task.description || NO_DATA.description}
        </Text>
      </Flex>

      <Flex
        justify='end'
        mt={4}
      >
        <SimpleButton
          leftIcon={<EditCircle />}
          onClick={() => showEditMode()}
          size='md'
        >
          Modo edición
        </SimpleButton>
      </Flex>
    </Flex>
  )
}

export default ViewMode
