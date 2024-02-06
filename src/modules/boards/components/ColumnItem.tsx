import { GET_STYLES_SCROLL } from '@/shared/constants'
import { Flex, useColorModeValue } from '@chakra-ui/react'
import { ColumnsBoard } from '@/modules/boards/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import ColumnFooter from './ColumnFooter'
import ColumnContent from './ColumnContent'
import ColumnHeader from './ColumnHeader'

interface props {
  column: ColumnsBoard
}

export interface EditMode {
  name: boolean
}

export const MIN_H = 50
export const MIN_W = 300

const ColumnItem = ({ column }: props) => {
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
      type: 'COLUMN',
      column,
    },
    disabled: editMode.name,
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
          h='full'
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
            />
          </Flex>

          <Flex
            bg={bgCardContent}
            h='full'
            borderRadius={8}
            p={2}
            sx={GET_STYLES_SCROLL()}
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
