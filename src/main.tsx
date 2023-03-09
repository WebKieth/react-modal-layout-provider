import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import { BasicExample } from './example/pages'

const WelcomeMenu = () => {
  return <div>
    <Link to='/basic' className=''>
      <div>Basic Example</div>
      <div>One Chain</div>
    </Link>
    <Link to='/extended' className=''>
      <div>Extended Example</div>
      <div>Two Chains</div>
    </Link>
  </div>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomeMenu/>
  }, {
    path: '/basic',
    element: <BasicExample/>
  }
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
