import { BoardsIcon } from '@/shared/Icons'

export interface ItemNav {
  type: string
  label: string
  icon: JSX.Element
  path: string
}

const itemsNavigation: ItemNav[] = [
  {
    type: 'LINK',
    label: 'Tableros',
    icon: <BoardsIcon />,
    path: `/`,
  },
]

export default itemsNavigation
