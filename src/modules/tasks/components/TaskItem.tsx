import { Flex, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { TasksBoard } from '../types'
import { ArrowBounce, Eye, Trash } from '@/shared/Icons'
import { SimpleIconButton } from '@/shared/components/buttons'
import { useTasksStore } from '../store'
import { useState } from 'react'
import { ConfirmModal, SimpleModal } from '@/shared/components/modals'
import Form from '@/modules/tasks/components/Form'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GET_IS_SMALL_SCREAM, KEYS_DND } from '@/shared/constants'
import MoveMenu from './MoveMenu'

interface Props {
  task: TasksBoard
}

const MINH = 100

const TaskItem = ({ task }: Props) => {
  const {
    deleteTask,
    isOpenModal,
    handleModal,
    handleModalDelete,
    isOpenModalDelete,
    selectCurrentTask,
    currentTaskSelected,
  } = useTasksStore((store) => store)
  const [isOverItem, setIsOverItem] = useState(false)
  const [isOverDeleteIcon, setIsOverDeleteIcon] = useState(false)
  const { isOpen: isOpenMove, onToggle: onToggleMove } = useDisclosure()
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
    disabled: isSmallScream || isOpenModal,
  })

  const stylesDnd = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const openModal = (type: 'DELETE' | 'VIEW') => {
    selectCurrentTask(task)

    if (type === 'VIEW') return handleModal(!isOpenModal)
    if (type === 'DELETE') return handleModalDelete(!isOpenModal)
  }

  const closeModal = (type: 'DELETE' | 'VIEW') => {
    selectCurrentTask(undefined)
    if (type === 'VIEW') return handleModal(false)
    if (type === 'DELETE') return handleModalDelete(false)
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
          if (!isOverDeleteIcon && !isDragging && !isSmallScream)
            return openModal('VIEW')
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

          {isOverItem && !isSmallScream && (
            <SimpleIconButton
              icon={<Trash />}
              aria-label='delete'
              onClick={() => openModal('DELETE')}
              bg='transparent'
              _hover={{ bg: 'transparent', color: 'mediumPurple.300' }}
              size='xs'
              onMouseOver={() => setIsOverDeleteIcon(true)}
              onMouseLeave={() => setIsOverDeleteIcon(false)}
            />
          )}
          {isSmallScream && (
            <Flex gap={2}>
              <SimpleIconButton
                icon={<Eye />}
                aria-label='view'
                bg='transparent'
                _hover={{ bg: 'transparent', color: 'mediumPurple.300' }}
                size='xs'
                onClick={() => openModal('VIEW')}
              />
              <SimpleIconButton
                icon={<ArrowBounce />}
                aria-label='move'
                onClick={() => onToggleMove()}
                bg='transparent'
                _hover={{ bg: 'transparent', color: 'mediumPurple.300' }}
                size='xs'
              />
              <SimpleIconButton
                icon={<Trash />}
                aria-label='delete'
                onClick={() => openModal('DELETE')}
                bg='transparent'
                _hover={{ bg: 'transparent', color: 'mediumPurple.300' }}
                size='xs'
              />
            </Flex>
          )}
        </Flex>
      </Flex>
      {isOpenModalDelete && task?.key === currentTaskSelected?.key && (
        <ConfirmModal
          isOpen={isOpenModalDelete}
          onClose={() => closeModal('DELETE')}
          modalHeader='Eliminar Tarea'
          modalDescription={`Estas seguro de eliminar la tarea llamada "${task.name}"? 😯`}
          onClickConfirm={() => {
            closeModal('DELETE')
            deleteTask({ taskKey: task.key })
          }}
        />
      )}
      {isOpenModal && task?.key === currentTaskSelected?.key && !isDragging && (
        <SimpleModal
          modalHeader='Actualizar tarea 🧐'
          isOpen={isOpenModal}
          onClose={() => closeModal('VIEW')}
          size='4xl'
        >
          <Form
            task={task}
            columnKey={task.columnKey}
            onClose={() => closeModal('VIEW')}
          />
        </SimpleModal>
      )}

      {isOpenMove &&
        task?.key === currentTaskSelected?.key &&
        isSmallScream && (
          <SimpleModal
            modalHeader='Mover tarea 😬'
            isOpen={isOpenMove}
            onClose={onToggleMove}
          >
            <MoveMenu
              task={task}
              onClose={onToggleMove}
            />
          </SimpleModal>
        )}
    </>
  )
}

export default TaskItem
