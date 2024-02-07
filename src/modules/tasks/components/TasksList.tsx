import { Flex } from '@chakra-ui/react'
import { useTasksStore } from '../store'
import TaskItem from './TaskItem'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo } from 'react'

interface Props {
  columnKey: string
}

const TasksList = ({ columnKey }: Props) => {
  const tasksBoard = useTasksStore((state) => state.tasksBoard)
  const tasksKeys = useMemo(
    () => tasksBoard.map((task) => task.key),
    [tasksBoard]
  )

  return (
    <Flex
      w='full'
      gap={2}
      direction='column'
      overflow='auto'
    >
      {tasksBoard
        .filter((taks) => taks.columnKey === columnKey)
        .map((task) => (
          <SortableContext
            items={tasksKeys}
            key={task.key}
          >
            <TaskItem task={task} />
          </SortableContext>
        ))}
    </Flex>
  )
}

export default TasksList
