import { useState } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemeButton from '@/components/ThemeButton'
import { Button } from '@/components/ui/button'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <h1>Home</h1>
    }
  ])

  return (
    <ThemeProvider>
      <ThemeButton />
    </ThemeProvider>
  )
}

export default App
