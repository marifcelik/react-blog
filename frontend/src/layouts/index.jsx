import { createPortal } from 'react-dom'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/style.css'

function Index() {
  return (
    <ThemeProvider>
      <Header />
      <main className='py-12 md:py-16 pt-24 pb-12 md:pt-28 md:pb-16'>
        <Outlet />
      </main>
      {createPortal(<Footer />, document.body)}
    </ThemeProvider>
  )
}

export default Index