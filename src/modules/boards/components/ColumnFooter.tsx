import { CirclePlus } from '@/shared/Icons'
import { SimpleButton } from '@/shared/components/buttons'
import { SimpleModal } from '@/shared/components/modals'
import { useDisclosure } from '@chakra-ui/react'
import { ColumnsBoard } from '../types'
import { Form } from '@/modules/tasks/components'
interface Props {
  column: ColumnsBoard
}

const ColumnFooter = ({ column }: Props) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <SimpleButton
        leftIcon={<CirclePlus />}
        bg='transparent'
        colorScheme={undefined}
        _hover={{ bg: 'transparent', color: 'mediumPurple.300' }}
        onClick={() => onToggle()}
      >
        Nueva tarea
      </SimpleButton>
      {isOpen && (
        <SimpleModal
          modalHeader='Nueva tarea 🤔'
          isOpen={isOpen}
          onClose={onToggle}
        >
          <Form
            columnKey={column.key}
            onClose={onToggle}
          />
        </SimpleModal>
      )}
    </>
  )
}

export default ColumnFooter
