import { PATHS } from '@/modules/projects/paths'
import { Navigate } from 'react-router-dom'
import projectsRoutes from '@/modules/projects/router'
import boardsRoutes from '@/modules/boards/router'

const generalsRoutes = [
  {
    path: '/',
    key: 'INDEX',
    exact: true,
    element: () => <Navigate to={`/${PATHS.BASE_MODULE.CLI}`} />,
  },
]

const routes = [...generalsRoutes, ...projectsRoutes, ...boardsRoutes]

export default routes
