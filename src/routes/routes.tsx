import { PATHS } from '@/modules/projects/paths'
import { Navigate } from 'react-router-dom'
import projectsRoutes from '@/modules/projects/router'
import boardsRoutes from '@/modules/boards/router'
import settingsRoutes from '@/modules/settings/router'
import { NotFound } from '@/shared/pages'

const generalsRoutes = [
  {
    path: '/',
    key: 'INDEX',
    exact: true,
    element: () => <Navigate to={`/${PATHS.BASE_MODULE.CLI}`} />,
  },
  {
    path: '*',
    key: 'all',
    element: () => <Navigate to='404' />,
  },
  {
    path: '404',
    key: '404',
    element: () => <NotFound />,
  },
]

const routes = [
  ...generalsRoutes,
  ...projectsRoutes,
  ...boardsRoutes,
  ...settingsRoutes,
]

export default routes
