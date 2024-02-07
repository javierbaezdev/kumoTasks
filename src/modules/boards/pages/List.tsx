import { Flex } from '@chakra-ui/react'
import { GET_STYLES_SCROLL } from '@/shared/constants'
import { useRef, WheelEvent } from 'react'
import NewColumnButton, { MIN_H } from '../components/NewColumnButton'
import ColumnsContainer from '../components/ColumnsContainer'
import { useBoardsStore } from '../store'
import { Message } from '@/shared/components'

const List = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const columnsBoard = useBoardsStore((store) => store.columnsBoard)
  const handleWheelScroll = (e: WheelEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail))
      containerRef.current.scrollLeft -= delta * 40
    }
  }

  return (
    <Flex
      gap={2}
      w='full'
      h='100%'
      py={4}
      sx={GET_STYLES_SCROLL()}
      ref={containerRef}
      onWheel={handleWheelScroll}
      overflowX='auto'
    >
      <NewColumnButton />
      {columnsBoard.length > 0 && <ColumnsContainer />}
      {columnsBoard.length === 0 && (
        <Flex
          w='full'
          h={MIN_H}
        >
          <Message
            msg='Tu lista está vacía'
            description='Actualmente no hay ninguna columna agregada. Haz clic en "Agregar Nueva Columna" para comenzar.'
            type='info'
          />
        </Flex>
      )}
    </Flex>
  )
}

export default List
