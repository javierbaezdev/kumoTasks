import { Flex } from '@chakra-ui/react'
import { GET_STYLES_SCROLL } from '@/shared/constants'
import { useEffect, useRef, WheelEvent } from 'react'
import NewColumnButton from '../components/NewColumnButton'
import ColumnsContainer from '../components/ColumnsContainer'
import { useBoardsStore } from '../store'
import { Message } from '@/shared/components'
import { useNavigate, useParams } from 'react-router-dom'
import { useProjectsStore } from '@/modules/projects/store'

const List = () => {
  const { projectKey } = useParams()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const columnsBoard = useBoardsStore((store) => store.columnsBoard)
  const projects = useProjectsStore((store) => store.projects)
  const handleWheelScroll = (e: WheelEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail))
      containerRef.current.scrollLeft -= delta * 40
    }
  }

  useEffect(() => {
    const hasElementWithKey = projects.some((item) => item.key === projectKey)

    if (!hasElementWithKey) {
      navigate('404')
    }
  }, [projectKey])

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
          h='fit-content'
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
