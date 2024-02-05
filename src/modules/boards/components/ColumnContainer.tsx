import { useParams } from 'react-router-dom'
import { CirclePlus, Trash } from '@/shared/Icons'
import { SimpleIconButton } from '@/shared/components/buttons'
import { ConfirmModal } from '@/shared/components/modals'
import { GET_STYLES_SCROLL } from '@/shared/constants'
import {
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useBoardsStore } from '../store'
import { ColumnsBoard } from '@/modules/boards/types'
import { generateId } from '@/shared/utils/generate'

interface props {
  column?: ColumnsBoard
  isNew?: boolean
}

export const MIN_H = 50
export const MIN_W = 300

const ColumnContainer = ({ column, isNew }: props) => {
  const { projectKey } = useParams()
  const { deleteColumn, addColumn } = useBoardsStore((store) => store)
  const bgCard = useColorModeValue('light.primary.100', 'dark.primary.300')
  const bgCardContent = useColorModeValue(
    'light.secondary.200',
    'dark.secondary.300'
  )
  const bgHover = useColorModeValue('light.secondary.200', 'dark.secondary.200')
  const { isOpen: isOpenDelete, onToggle: onToggleDelete } = useDisclosure()

  const addNewColumn = () => {
    if (projectKey) {
      addColumn({ key: generateId(), name: 'nueva columna', projectKey })
    }
  }

  return (
    <>
      <Flex
        bg={bgCard}
        p={2}
        borderRadius={8}
        direction='column'
        gap={2}
        minW={MIN_W}
        minH={MIN_H}
        maxH={isNew ? MIN_H : undefined}
        cursor={isNew ? 'pointer' : undefined}
        _hover={isNew ? { bg: bgHover } : undefined}
        onClick={isNew && projectKey ? () => addNewColumn() : undefined}
        align={isNew ? 'center' : undefined}
        justify={isNew ? 'center' : 'space-between'}
      >
        {isNew && (
          <Flex
            align='center'
            gap={2}
          >
            <Icon fontSize={28}>
              <CirclePlus />
            </Icon>
            <Text
              noOfLines={[1]}
              fontSize='1.2rem'
            >
              Agregar Nueva Columna
            </Text>
          </Flex>
        )}
        {!isNew && column && (
          <Flex
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
              <Flex
                justify='space-between'
                align='center'
              >
                <Text
                  as='b'
                  noOfLines={[1]}
                >
                  {column.name}
                </Text>

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
            </Flex>

            <Flex
              bg={bgCardContent}
              h='full'
              borderRadius={8}
              p={2}
              sx={GET_STYLES_SCROLL()}
            >
              contents
            </Flex>

            <Flex
              p={2}
              bg={bgCardContent}
              borderRadius={8}
            >
              Total de tareas: {0}
            </Flex>
          </Flex>
        )}
      </Flex>
      {isOpenDelete && column && (
        <ConfirmModal
          isOpen={isOpenDelete}
          onClose={onToggleDelete}
          modalHeader='Eliminar Columna'
          modalDescription={`Estas seguro de eliminar la columna llamada "${column.name}"? 😯`}
          onClickConfirm={() => deleteColumn(column.key)}
        />
      )}
    </>
  )
}

export default ColumnContainer
