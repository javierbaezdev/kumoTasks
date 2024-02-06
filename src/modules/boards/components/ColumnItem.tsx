import { Trash } from '@/shared/Icons'
import { SimpleIconButton } from '@/shared/components/buttons'
import { ConfirmModal } from '@/shared/components/modals'
import { GET_STYLES_SCROLL } from '@/shared/constants'
import { Flex, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useBoardsStore } from '../store'
import { ColumnsBoard } from '@/modules/boards/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface props {
  column: ColumnsBoard
}

export const MIN_H = 50
export const MIN_W = 300

const ColumnItem = ({ column }: props) => {
  const deleteColumn = useBoardsStore((store) => store.deleteColumn)
  const bgCard = useColorModeValue('light.primary.100', 'dark.primary.300')
  const borderColor = useColorModeValue(
    'light.primaryFull.950',
    'dark.primaryFull.300'
  )
  const bgCardContent = useColorModeValue(
    'light.secondary.300',
    'dark.secondary.300'
  )
  const { isOpen: isOpenDelete, onToggle: onToggleDelete } = useDisclosure()
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.key,
    data: {
      type: 'COLUMN',
      column,
    },
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
        bg={bgCard}
        p={2}
        borderRadius={8}
        direction='column'
        gap={2}
        minW={MIN_W}
        minH={MIN_H}
        justify='space-between'
        opacity={isDragging ? 0.2 : 1}
        border={isDragging ? '1px solid' : undefined}
        borderColor={isDragging ? borderColor : undefined}
      >
        <Flex
          {...attributes}
          {...listeners}
          gap={2}
          direction='column'
          h='full'
        >
          <Flex
            direction='column'
            gap={2}
            bg={bgCardContent}
            borderRadius={8}
            p={2}
          >
            <Flex
              justify='space-between'
              align='center'
            >
              <Text
                as='b'
                noOfLines={[1]}
              >
                {column.name}
              </Text>

              <Flex gap={2}>
                <SimpleIconButton
                  icon={<Trash />}
                  aria-label='delete'
                  onClick={() => onToggleDelete()}
                  bg='transparent'
                  _hover={{ bg: 'transparent', color: 'mediumPurple.300' }}
                  size='xs'
                />
              </Flex>
            </Flex>
          </Flex>

          <Flex
            bg={bgCardContent}
            h='full'
            borderRadius={8}
            p={2}
            sx={GET_STYLES_SCROLL()}
          >
            contents
          </Flex>

          <Flex
            p={2}
            bg={bgCardContent}
            borderRadius={8}
          >
            Total de tareas: {0}
          </Flex>
        </Flex>
      </Flex>
      {isOpenDelete && column && (
        <ConfirmModal
          isOpen={isOpenDelete}
          onClose={onToggleDelete}
          modalHeader='Eliminar Columna'
          modalDescription={`Estas seguro de eliminar la columna llamada "${column.name}"? 😯`}
          onClickConfirm={() => deleteColumn(column.key)}
        />
      )}
    </>
  )
}

export default ColumnItem
