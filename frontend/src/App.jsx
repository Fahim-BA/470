import './App.css'
import ResponsiveNavbar from './components/Navbar'
import AllRoutes from './routes/AllRoutes'
import Breadcrumb from './components/Breadcrumb'

function App() {
  return (
    <div className='bg-[#e1dae4]'>
      <ResponsiveNavbar />
      <Breadcrumb />
      <AllRoutes />
    </div>
  )
}

export default App
