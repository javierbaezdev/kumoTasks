import { GET_COLORS_THEME } from '@/shared/constant'
import { ItemNav } from './TabsList'
import { Flex, Link as LinkChakra, ListIcon, Text } from '@chakra-ui/react'
import { useMainLayoutStore } from '../store'
interface props {
  item: ItemNav
  isActive: boolean
}

const NaviItem = ({ item, isActive }: props) => {
  const collapse = useMainLayoutStore((store) => store.collapse)
  const { colors } = GET_COLORS_THEME()
  const { label, type, icon, path } = item

  return (
    <>
      {type === 'LINK' ? (
        <Flex
          align='center'
          justify='center'
          my={4}
        >
          <LinkChakra
            href={path}
            display='flex'
            alignItems='center'
            justifyContent={!collapse ? 'center' : undefined}
            fontWeight='medium'
            w='full'
            opacity={isActive ? 1 : 0.8}
            _hover={{
              textDecoration: 'none',
              color: colors.mediumPurple[300],
            }}
            gap={2}
          >
            <ListIcon
              fontSize={30}
              m={0}
            >
              {icon}
            </ListIcon>
            {collapse && <Text fontSize={20}>{label}</Text>}
          </LinkChakra>
        </Flex>
      ) : null}
    </>
  )
}

export default NaviItem
