import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import InputEditMode from './InputEditMode'
import { useBoardsStore } from '@/modules/boards/store'
import { ColumnsBoard } from '../types'
import { NO_DATA } from '@/shared/constants'
import { SimpleIconButton } from '@/shared/components/buttons'
import { Trash } from '@/shared/Icons'
import { ConfirmModal } from '@/shared/components/modals'
import { EditMode } from './ColumnItem'
import { useTasksStore } from '@/modules/tasks/store'

interface Props {
  column: ColumnsBoard
  editMode: EditMode
  onChangeEditMode: (newEditMode: EditMode) => void
}

const ColumnHeader = ({ column, editMode, onChangeEditMode }: Props) => {
  const { deleteColumn, updateColumn } = useBoardsStore((store) => store)
  const deleteTask = useTasksStore((store) => store.deleteTask)
  const { isOpen: isOpenDelete, onToggle: onToggleDelete } = useDisclosure()

  const onChangeColumnName = (value: string = '') => {
    const LIMIT = 20
    const limitValue = value.length > LIMIT ? value.substring(0, LIMIT) : value

    updateColumn({ ...column, name: limitValue })
  }

  const onBlurColumnName = () => {
    if (!column.name) {
      updateColumn({ ...column, name: NO_DATA.columnName })
    }
    onChangeEditMode({ ...editMode, name: false })
  }

  return (
    <>
      <Flex
        justify='space-between'
        align='center'
      >
        {!editMode.name && (
          <Text
            as='b'
            noOfLines={[1]}
            onClick={() => onChangeEditMode({ ...editMode, name: true })}
          >
            {column.name}
          </Text>
        )}
        {editMode.name && (
          <InputEditMode
            value={column.name}
            max={10}
            onBlur={() => onBlurColumnName()}
            onChange={(e) => onChangeColumnName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return
              onChangeEditMode({ ...editMode, name: false })
            }}
          />
        )}

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
      {isOpenDelete && column && (
        <ConfirmModal
          isOpen={isOpenDelete}
          onClose={onToggleDelete}
          modalHeader='Eliminar Columna'
          modalDescription={`Estas seguro de eliminar la columna llamada "${column.name}"? 😯`}
          onClickConfirm={() => {
            deleteColumn({ columnKey: column.key })
            deleteTask({ columnKey: column.key })
          }}
        />
      )}
    </>
  )
}

export default ColumnHeader
