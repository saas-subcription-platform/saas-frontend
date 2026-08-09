import AppRoutes from './app/routes/AppRoutes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ScrollToTop from './components/ui/ScrollToTop'

function App() {
  return (
    <>
      <AppRoutes/>
      <ToastContainer/>
      <ScrollToTop />
    </>
  )
}

export default App