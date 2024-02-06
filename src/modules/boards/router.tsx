import { lazy } from 'react'
import { PATHS } from './paths'
import { MainLayout } from '@/shared/Layouts'
import { FAKE_DELAY_ROUTER } from '@/shared/constants'

const List = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_ROUTER))
  return import('./pages/List')
})

const clientRoutes = [
  {
    path: `/${PATHS.BASE_MODULE.CLI}/:projectKey`,
    key: 'BOARDS_LIST',
    exact: true,
    element: () => (
      <MainLayout>
        <List />
      </MainLayout>
    ),
  },
]

export default clientRoutes
