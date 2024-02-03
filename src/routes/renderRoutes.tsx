import { Route, Routes } from 'react-router-dom'
import routes from './routes'

function RenderRoutes() {
  return (
    <Routes>
      {routes.map((item: any) => (
        <Route
          key={`router-${item.key}`}
          path={item.path}
          element={<item.element />}
        />
      ))}
    </Routes>
  )
}

export default RenderRoutes
