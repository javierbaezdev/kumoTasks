import {
  GET_IS_SMALL_SCREAM,
  GET_STYLES_SCROLL,
  KEYS_DND,
} from '@/shared/constants'
import { Flex, useColorModeValue } from '@chakra-ui/react'
import { ColumnsBoard } from '@/modules/boards/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import ColumnFooter from './ColumnFooter'
import ColumnContent from './ColumnContent'
import ColumnHeader from './ColumnHeader'
import { useTasksStore } from '@/modules/tasks/store'

interface props {
  column: ColumnsBoard
}

export interface EditMode {
  name: boolean
}

export const MIN_H = 50
export const MIN_W = 350

const ColumnItem = ({ column }: props) => {
  const isSmallScream = GET_IS_SMALL_SCREAM()
  const [isOpenDeleteCurrentColumn, setIsOpenDeleteCurrentColumn] =
    useState(false)
  const isOpenModalTask = useTasksStore((store) => store.isOpenModal)
  const isOpenModalDeleteTask = useTasksStore(
    (store) => store.isOpenModalDelete
  )
  const [editMode, setEditMode] = useState<EditMode>({
    name: false,
  })

  const bgCard = useColorModeValue('light.primary.100', 'dark.primary.300')
  const borderColor = useColorModeValue(
    'light.primaryFull.950',
    'dark.primaryFull.300'
  )
  const bgCardContent = useColorModeValue(
    'light.secondary.300',
    'dark.secondary.300'
  )

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
      type: KEYS_DND.COLUMN,
      column,
    },
    disabled:
      editMode.name ||
      isSmallScream ||
      isOpenModalTask ||
      isOpenModalDeleteTask ||
      isOpenDeleteCurrentColumn,
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
        maxW={MIN_W}
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
          h='100%'
        >
          <Flex
            direction='column'
            gap={2}
            bg={bgCardContent}
            borderRadius={8}
            p={2}
          >
            <ColumnHeader
              column={column}
              editMode={editMode}
              onChangeEditMode={(newEditMode) => setEditMode(newEditMode)}
              isOpenDeleteColumn={(isOpenDelete) =>
                setIsOpenDeleteCurrentColumn(isOpenDelete)
              }
            />
          </Flex>

          <Flex
            bg={bgCardContent}
            h='100%'
            borderRadius={8}
            p={2}
            sx={GET_STYLES_SCROLL()}
            overflow='auto'
          >
            <ColumnContent column={column} />
          </Flex>

          <Flex
            p={1}
            bg={bgCardContent}
            borderRadius={8}
            justify='center'
          >
            <ColumnFooter column={column} />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default ColumnItem
