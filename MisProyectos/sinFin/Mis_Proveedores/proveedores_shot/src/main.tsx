import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { proveedoresApp as ProveedoresApp } from './proveedoresApp';
import './index.css'  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProveedoresApp />
  </StrictMode>,
)
