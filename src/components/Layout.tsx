import { Outlet } from 'react-router'
import Header from './Header'
import SideBar from './SideBar'
import AddNewBoard from './Modals/AddNewBoard'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-[100svh]'>
      <Header />
      <SideBar />
      <Outlet />
      <AddNewBoard />
    </div>
  )
}

export default Layout
