import { createPortal } from 'react-dom'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function Index() {
  return (
    <>
      <Header />
      <main className='container mx-auto pt-24 md:pt-28 pb-12 md:pb-16'>
        <Outlet />
      </main>
      {createPortal(<Footer />, document.body)}
      <ScrollRestoration />
    </>
  )
}

export default Index