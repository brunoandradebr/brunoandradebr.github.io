import { HashRouter, Routes, Route } from 'react-router-dom'

import { AppLayout } from 'layout/AppLayout'

import { Home, Experiments, Contact } from 'pages'

export const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="" Component={AppLayout}>
          <Route path="" Component={Home}></Route>
          <Route path="/experiments" Component={Experiments}></Route>
          <Route path="/contact" Component={Contact}></Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}
