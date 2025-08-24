
// react-router 声明模式示例
import { lazy, StrictMode, Suspense } from 'react'
import { BrowserRouter,  Route, Routes } from 'react-router'
import Home from '@/pages/home/Home'
import Settings from '@/pages/user/settings/Settings'
import delayForComponet from '@/utils/delayForComponet'
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const About = lazy(() => delayForComponet(import('@/pages/about/About')));

function App() {
  return (
  <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
            <Routes>
              <Route index element={<Home />}  />
              <Route 
              path="dashboard" 
              element={<Dashboard />}  
              >
              </Route>
              <Route path="settings" element={<Settings />}   />
              <Route 
              path="about" 
              element={<About />}
              />
          </Routes>
        </BrowserRouter>
    </Suspense>
  </StrictMode>
  )
}

export default App
