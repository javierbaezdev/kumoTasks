import { lazy } from 'react'
import { PATHS } from './paths'
import { FAKE_DELAY_ROUTER } from '@/shared/constants'
import { MainLayout } from '@/shared/Layouts'

const Settings = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_ROUTER))
  return import('./pages/settings')
})

const Routes = [
  {
    path: `/${PATHS.BASE_MODULE.CLI}`,
    key: 'SETTINGS',
    exact: true,
    element: () => (
      <MainLayout>
        <Settings />
      </MainLayout>
    ),
  },
]

export default Routes
