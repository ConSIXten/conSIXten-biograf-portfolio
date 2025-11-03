import { Outlet, useLocation } from 'react-router'
import HomePageHeader from './Components/header/HomePageHeader';
import '../css/style.css'


function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <header>
        {isHomePage && <HomePageHeader /> }
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <small>© 2023 My App</small>
      </footer>
    </>
  )
}

export default App
