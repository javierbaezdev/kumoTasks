import { Flex } from '@chakra-ui/react'
import { TasksBoard } from '../types'
import { Autocomplete } from '@/shared/components/inputs'
import { useBoardsStore } from '@/modules/boards/store'
import { useState } from 'react'
import { Item } from '@/shared/components/inputs/Autocomplete'
import { SimpleButton } from '@/shared/components/buttons'
import { ArrowBounce } from '@/shared/Icons'
import { useTasksStore } from '../store'

interface Props {
  task: TasksBoard
  onClose: () => void
}

const MoveMenu = ({ task, onClose }: Props) => {
  const columnsBoard = useBoardsStore((store) => store.columnsBoard)
  const moveTaskToOtherColumn = useTasksStore(
    (store) => store.moveTaskToOtherColumn
  )
  const [currentColumn, setCurrentColumn] = useState<Item | null>(null)

  const onClickMove = () => {
    if (currentColumn) {
      moveTaskToOtherColumn(task?.key, currentColumn?.value, true)
      onClose()
    }
  }
  return (
    <Flex
      direction='column'
      gap={2}
    >
      <Autocomplete
        label='Columnas'
        onChange={(item) => {
          setCurrentColumn(item || null)
        }}
        list={columnsBoard?.map((column) => ({
          value: column.key,
          label: column.name,
        }))}
      />
      <SimpleButton
        leftIcon={<ArrowBounce />}
        onClick={onClickMove}
        isDisabled={!currentColumn}
      >
        Mover
      </SimpleButton>
    </Flex>
  )
}

export default MoveMenu
