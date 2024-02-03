import { ItemNav } from './TabsList'
import {
  Flex,
  Link as LinkChakra,
  ListIcon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useMainLayoutStore } from '../store'
import { useLocation } from 'react-router-dom'
import { GRADIENTS_BG } from '@/shared/constant'

interface props {
  item: ItemNav
  isActive: boolean
}

const NaviItem = ({ item, isActive }: props) => {
  const location = useLocation()
  const collapse = useMainLayoutStore((store) => store.collapse)
  const bgLink = useColorModeValue(GRADIENTS_BG.LIGHT, GRADIENTS_BG.DARK)
  const { label, type, icon, path } = item

  return (
    <>
      {type === 'LINK' ? (
        <Flex
          align='center'
          justify='center'
          my={4}
          bg={location.pathname === path ? bgLink : undefined}
          p={2}
          borderRadius={8}
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
              color: 'mediumPurple.300',
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
