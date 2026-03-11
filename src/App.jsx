import { useContext } from 'react'
import AppRoutes from './routes/AppRoutes'


const App = () => {
  return (
    <div className='h-screen w-full bg-blue-950'>
      <AppRoutes/>
    </div>
  )
}

export default App