import { lazy } from 'react'
import { PATHS } from './paths'
import { MainLayout } from '@/shared/Layouts'

const List = lazy(async () => await import('./pages/List'))

const clientRoutes = [
  {
    path: `/${PATHS.BASE_MODULE.CLI}`,
    key: 'PROJECTS_LIST',
    exact: true,
    element: () => (
      <MainLayout>
        <List />
      </MainLayout>
    ),
  },
]

export default clientRoutes
