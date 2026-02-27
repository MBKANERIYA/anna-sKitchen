import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collections from './pages/Collections';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ScrollToTop from './components/ScrollToTop';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import BlogsListPage from './pages/BlogsListPage';
import ContactPage from './pages/ContactPage';

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
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/blogs" element={<BlogsListPage />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:category" element={<CollectionPage />} />
          <Route path="/collections/:category/:productName" element={<ProductDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
