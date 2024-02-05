import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useColorModeValue,
} from '@chakra-ui/react'
import { SimpleButton } from '@/shared/components/buttons'
import { useRef } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  modalHeader: string | JSX.Element
  modalDescription?: string | JSX.Element
  onClickConfirm: () => void
}

const ConfirmModal = ({
  isOpen,
  onClose,
  modalHeader,
  modalDescription,
  onClickConfirm,
}: Props) => {
  const bg = useColorModeValue('light.secondary.300', 'dark.secondary.300')
  const leastDestructiveRef = useRef(null)
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      motionPreset='slideInBottom'
      leastDestructiveRef={leastDestructiveRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg={bg}>
          <AlertDialogHeader
            fontSize='lg'
            fontWeight='bold'
          >
            {modalHeader}
          </AlertDialogHeader>

          {modalDescription && (
            <AlertDialogBody>{modalDescription}</AlertDialogBody>
          )}

          <AlertDialogFooter>
            <SimpleButton
              variant='outline'
              onClick={onClose}
            >
              Cancelar
            </SimpleButton>
            <SimpleButton
              onClick={() => onClickConfirm()}
              ml={3}
            >
              Si, Eliminar
            </SimpleButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default ConfirmModal
