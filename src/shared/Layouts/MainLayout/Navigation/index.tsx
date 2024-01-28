import { List, ListItem } from '@chakra-ui/react'
import itemsNavigation from './TabsList'
import NaviItem from './NaviItem'

const Navigation = () => {
  return (
    <List my={10}>
      {itemsNavigation.map((item, index) => (
        <ListItem key={index}>
          <NaviItem
            item={item}
            isActive={index === 0}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default Navigation
