import { Flex, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { TasksBoard } from '../types'
import { Trash } from '@/shared/Icons'
import { SimpleIconButton } from '@/shared/components/buttons'
import { useTasksStore } from '../store'
import { useState } from 'react'
import { ConfirmModal, SimpleModal } from '@/shared/components/modals'
import Form from '@/modules/tasks/components/Form'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GET_IS_SMALL_SCREAM, KEYS_DND } from '@/shared/constants'

interface Props {
  task: TasksBoard
}

const MINH = 100

const TaskItem = ({ task }: Props) => {
  const deleteTask = useTasksStore((store) => store.deleteTask)
  const [isOverItem, setIsOverItem] = useState(false)
  const [isOverDeleteIcon, setIsOverDeleteIcon] = useState(false)
  const { isOpen, onToggle } = useDisclosure()
  const { isOpen: isOpenDelete, onToggle: onToggleDelete } = useDisclosure()
  const bg = useColorModeValue('light.primary.100', 'dark.primary.300')
  const bgHover = useColorModeValue('light.secondary.200', 'dark.secondary.200')
  const borderColor = useColorModeValue(
    'light.primaryFull.950',
    'dark.primaryFull.300'
  )
  const isSmallScream = GET_IS_SMALL_SCREAM()

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.key,
    data: {
      type: KEYS_DND.TASK,
      task,
    },
    disabled: isSmallScream,
  })

  const stylesDnd = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <>
      <Flex
        ref={setNodeRef}
        style={stylesDnd}
        bg={bg}
        minH={MINH}
        maxH={MINH}
        w='full'
        borderRadius={8}
        p={2}
        _hover={{ bg: bgHover }}
        onMouseOver={() => setIsOverItem(true)}
        onMouseLeave={() => setIsOverItem(false)}
        onClick={() => {
          if (!isOverDeleteIcon || isDragging) return onToggle()
        }}
        opacity={isDragging ? 0.2 : 1}
        border={isDragging ? '1px solid' : undefined}
        borderColor={isDragging ? borderColor : undefined}
      >
        <Flex
          {...attributes}
          {...listeners}
          justify='space-between'
          w='full'
          gap={2}
        >
          <Text
            as='b'
            noOfLines={[1, 2, 3]}
          >
            {task.name}
          </Text>

          {isOverItem && (
            <SimpleIconButton
              icon={<Trash />}
              aria-label='delete'
              onClick={() => onToggleDelete()}
              bg='transparent'
              _hover={{ bg: 'transparent', color: 'mediumPurple.300' }}
              size='xs'
              onMouseOver={() => setIsOverDeleteIcon(true)}
              onMouseLeave={() => setIsOverDeleteIcon(false)}
            />
          )}
        </Flex>
      </Flex>
      {isOpenDelete && task && (
        <ConfirmModal
          isOpen={isOpenDelete}
          onClose={onToggleDelete}
          modalHeader='Eliminar Tarea'
          modalDescription={`Estas seguro de eliminar la tarea llamada "${task.name}"? 😯`}
          onClickConfirm={() => deleteTask(task.key)}
        />
      )}
      {isOpen && task && !isDragging && (
        <SimpleModal
          modalHeader='Actualizar tarea 🧐'
          isOpen={isOpen}
          onClose={onToggle}
          size='4xl'
        >
          <Form
            task={task}
            columnKey={task.columnKey}
            onClose={onToggle}
          />
        </SimpleModal>
      )}
    </>
  )
}

export default TaskItem
