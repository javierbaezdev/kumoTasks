import { Flex } from '@chakra-ui/react'
import { useBoardsStore } from '../store'
import ColumnItem from './ColumnItem'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'
import { ColumnsBoard } from '../types'

const ColumnsContainer = () => {
  const { columnsBoard, sortColumns } = useBoardsStore((store) => store)
  const columnsKeys = useMemo(
    () => columnsBoard.map((column) => column.key),
    [columnsBoard]
  )
  const [activeColumn, setActiveColumn] = useState<ColumnsBoard | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  )

  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === 'COLUMN') {
      setActiveColumn(e.active.data.current.column)
      return
    }
  }

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e

    if (!over) return
    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId === overColumnId) return

    sortColumns(activeColumnId, overColumnId)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Flex
        h='100%'
        w='full'
        gap={2}
      >
        {columnsBoard?.map((column) => (
          <SortableContext
            items={columnsKeys}
            key={column.key}
          >
            <ColumnItem
              key={column.key}
              column={column}
            />
          </SortableContext>
        ))}
        <DragOverlay>
          {activeColumn && (
            <Flex h='100%'>
              <ColumnItem column={activeColumn} />
            </Flex>
          )}
        </DragOverlay>
      </Flex>
    </DndContext>
  )
}

export default ColumnsContainer
