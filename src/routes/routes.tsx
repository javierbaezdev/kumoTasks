import projectsRoutes from '@/modules/projects/router'
import { PATHS } from '@/modules/projects/paths'
import { Navigate } from 'react-router-dom'

const generalsRoutes = [
  {
    path: '/',
    key: 'INDEX',
    exact: true,
    element: () => <Navigate to={`/${PATHS.BASE_MODULE.CLI}`} />,
  },
]

const routes = [...generalsRoutes, ...projectsRoutes]

export default routes
