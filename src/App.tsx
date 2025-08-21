
import { StrictMode } from 'react'
import './App.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Settings from './pages/Settings'
function App() {
  return (
   <BrowserRouter>
      <StrictMode>
          <Routes>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
      </StrictMode>
    </BrowserRouter>
  )
}

export default App
