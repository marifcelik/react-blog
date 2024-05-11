import { createBrowserRouter, redirect } from 'react-router-dom'
import Root from './layouts/root'
import NotFound from '#/NotFound'
import Home from '#/Home'
import About from '#/About'
import Contact from '#/Contact'
import Post from '#/Post'
import Admin from './layouts/admin'
import AdminHome from '#/admin/Home'
import AdminPosts from '#/admin/Posts'
import AdminMessages from '#/admin/Messages'
import Login from '#/admin/Login'

function authCheck() {
  const isAuthenticated = localStorage.getItem('token')
  if (!isAuthenticated) {
    return redirect('/login')
  }
  return null
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, id: 'home', element: <Home /> },
      { path: 'about', id: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'posts/:id', element: <Post />}
    ]
  },
  {
    path: '/admin',
    id: 'admin',
    element: <Admin />,
    loader: authCheck,
    children: [
      { index: true, loader: authCheck, id: 'admin-home', element: <AdminHome /> },
      { path: 'posts', loader: authCheck, id: 'admin-posts', element: <AdminPosts /> },
      { path: 'messages', loader: authCheck, id: 'admin-messages', element: <AdminMessages /> },
    ]
  },
  { path: 'login', id: 'login', element: <Login /> },
  { path: '*', element: <NotFound /> }
])

export default router
