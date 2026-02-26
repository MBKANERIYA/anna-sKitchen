import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collections from './pages/Collections';
import CollectionPage from './pages/CollectionPage';
import ScrollToTop from './components/ScrollToTop';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <TopBar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:category" element={<CollectionPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
