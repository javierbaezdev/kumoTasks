import { TasksList } from '@/modules/tasks/components'
import { ColumnsBoard } from '../types'

interface props {
  column: ColumnsBoard
}

const ColumnContent = ({ column }: props) => {
  return <TasksList columnKey={column.key} />
}

export default ColumnContent
