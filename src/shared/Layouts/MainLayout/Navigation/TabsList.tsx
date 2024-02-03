import { BoxMultiple } from '@/shared/Icons'

export interface ItemNav {
  type: string
  label: string
  icon: JSX.Element
  path: string
}

const itemsNavigation: ItemNav[] = [
  {
    type: 'LINK',
    label: 'Proyectos',
    icon: <BoxMultiple />,
    path: `/projects`,
  },
]

export default itemsNavigation
