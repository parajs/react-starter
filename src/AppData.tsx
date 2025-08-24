// react-router 数据模式示例
import {  StrictMode, Suspense } from 'react'
import { RouterProvider } from 'react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import router from './router'
const queryClient = new QueryClient()

function AppData() {
  return (
    <StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
         <QueryClientProvider client = {queryClient}>
              <RouterProvider router={router} />
              <ReactQueryDevtools initialIsOpen={false} position='top' buttonPosition='bottom-right'/>
         </QueryClientProvider>
            
        </Suspense>
      </StrictMode>
  )
}

export default AppData
