import { useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import HomePageHeader from './Components/header/HomePageHeader';
import PageHeader from './Components/header/PageHeader';
import Footer from './Components/footer/Footer';
import '../css/style.css'


function App() {
  const location = useLocation();
  const [bookmarkState, setBookmarkState] = useState({ isBookmarked: false, onToggle: null });
  const isHomePage = location.pathname === '/';
  const isDetailsPage = location.pathname.startsWith('/explore/') && location.pathname !== '/explore';

  // Get dynamic page title based on route
  const getPageTitle = () => {
    const path = location.pathname;

    if (path.startsWith('/explore/') && path !== '/explore') {
      return 'Details Movie';
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
    if (path === '/saved' || path === '/bookmarks') {
      return 'Saved Movies';
    }

    return 'BiografApp';
  };

  return (
    <>
      <header>
        {isHomePage ? (
          <HomePageHeader />
        ) : (
          <PageHeader
            title={getPageTitle()}
            showSearch={!isDetailsPage}
            showBookmark={isDetailsPage}
            isBookmarked={bookmarkState.isBookmarked}
            onBookmarkClick={bookmarkState.onToggle}
          />
        )}
      </header>
      <main>
        <Outlet context={{ setBookmarkState }} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
