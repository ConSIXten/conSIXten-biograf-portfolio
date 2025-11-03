import { Outlet, useLocation } from 'react-router'
import HomePageHeader from './Components/header/HomePageHeader';
import PageHeader from './Components/header/PageHeader';
import Footer from './Components/footer/Footer';
import '../css/style.css'


function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Get dynamic page title based on route
  const getPageTitle = () => {
    const path = location.pathname;

    if (path.startsWith('/explore/') && path !== '/explore') {
      return 'Movie Detail';
    }
    if (path === '/explore') {
      return 'Explore Movie';
    }
    if (path === '/contact') {
      return 'Contact';
    }
    if (path === '/profile') {
      return 'Profile';
    }
    if (path === '/bookmarks') {
      return 'My Bookmarks';
    }

    return 'BiografApp';
  };

  return (
    <>
      <header>
        {isHomePage ? <HomePageHeader /> : <PageHeader title={getPageTitle()} />}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
