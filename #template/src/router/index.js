import Base from '@/views/Base'
import Home from '@/views/Home'
import About from '@/views/About'

const routes = [
  {
    path: '/',
    name: 'Base',
    component: Base
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

export default routes