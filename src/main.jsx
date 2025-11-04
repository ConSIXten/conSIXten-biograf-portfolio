import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './router'
import { BookmarkProvider } from './utilities/BookmarkContext.jsx'
import AuthProvider from './utilities/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BookmarkProvider>
        <RouterProvider router={router} />
      </BookmarkProvider>
    </AuthProvider>
  </StrictMode>,
)
