import { createRoot } from 'react-dom/client'
import '@/styles/global.css'
import '@/interceptors/index'
// import App from '@/App.tsx'
import '@/i18n';
import App from '@/AppData.tsx'
createRoot(document.getElementById('root')!).render(<App />)
