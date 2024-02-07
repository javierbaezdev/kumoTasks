import { Flex } from '@chakra-ui/react'
import { useBoardsStore } from '../store'
import ColumnItem from './ColumnItem'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'
import { ColumnsBoard } from '../types'
import { TasksBoard } from '@/modules/tasks/types'
import TaskItem from '@/modules/tasks/components/TaskItem'
import { useTasksStore } from '@/modules/tasks/store'
import { KEYS_DND } from '@/shared/constants'

const ColumnsContainer = () => {
  const { columnsBoard, sortColumns } = useBoardsStore((store) => store)
  const { sortTask, moveTaskToOtherColumn } = useTasksStore((store) => store)
  const columnsKeys = useMemo(
    () => columnsBoard.map((column) => column.key),
    [columnsBoard]
  )
  const [activeColumn, setActiveColumn] = useState<ColumnsBoard | null>(null)
  const [activeTask, setActiveTask] = useState<TasksBoard | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  )

  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === KEYS_DND.COLUMN) {
      setActiveColumn(e.active.data.current.column)
      return
    }

    if (e.active.data.current?.type === KEYS_DND.TASK) {
      setActiveTask(e.active.data.current.task)
      return
    }
  }

  const onDragEnd = (e: DragEndEvent) => {
    setActiveColumn(null)
    setActiveTask(null)
    const { active, over } = e

    if (!over) return
    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId === overColumnId) return

    sortColumns(activeColumnId, overColumnId)
  }

  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === KEYS_DND.TASK
    const isOverATask = over.data.current?.type === KEYS_DND.TASK

    if (!isActiveATask) return

    /* Im dropping a Task over another Task */
    if (isActiveATask && isOverATask) {
      sortTask(activeId, overId)
    }

    /* Im dropping a Task over a column */
    const isOverAColumn = over.data.current?.type === KEYS_DND.COLUMN

    if (isActiveATask && isOverAColumn) {
      moveTaskToOtherColumn(activeId, overId)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
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
          {activeTask && (
            <Flex h='100%'>
              <TaskItem task={activeTask} />
            </Flex>
          )}
        </DragOverlay>
      </Flex>
    </DndContext>
  )
}

export default ColumnsContainer
