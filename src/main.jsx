import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import VisionPhotoStudio_lightColorGrade from './VisionPhotoStudio_lightColorGrade.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VisionPhotoStudio_lightColorGrade />
  </StrictMode>,
)
