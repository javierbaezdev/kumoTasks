import { Flex } from '@chakra-ui/react'
import { GET_STYLES_SCROLL } from '@/shared/constants'
import { useRef, WheelEvent } from 'react'
import NewColumnButton from '../components/NewColumnButton'
import ColumnsContainer from '../components/ColumnsContainer'

const List = () => {
  const containerRef = useRef<HTMLDivElement>(null)

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
      <ColumnsContainer />
    </Flex>
  )
}

export default List
