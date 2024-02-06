import { Flex } from '@chakra-ui/react'
import { useTasksStore } from '../store'
import TaskItem from './TaskItem'

interface Props {
  columnKey: string
}

const TasksList = ({ columnKey }: Props) => {
  const tasksBoard = useTasksStore((state) => state.tasksBoard)
  return (
    <Flex
      w='full'
      gap={2}
      direction='column'
    >
      {tasksBoard
        .filter((taks) => taks.columnKey === columnKey)
        .map((task) => (
          <TaskItem task={task} />
        ))}
    </Flex>
  )
}

export default TasksList
