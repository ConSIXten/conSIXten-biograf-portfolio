import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './router'
import { BookmarkProvider } from './utilities/BookmarkContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookmarkProvider>
      <RouterProvider router={router} />
    </BookmarkProvider>
  </StrictMode>,
)
