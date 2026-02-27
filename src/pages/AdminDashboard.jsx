import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import productsData, { saveProductsData } from '../data/productsData';
import blogsData, { saveBlogsData } from '../data/blogsData';
import { FaTrash, FaEdit } from 'react-icons/fa';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('manage-products');
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [filterCategory, setFilterCategory] = useState('bakery-products');
    const [searchQuery, setSearchQuery] = useState('');

    // Product States
    const [selectedCategory, setSelectedCategory] = useState(Object.keys(productsData)[0]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState('');

    // Blog States
    const [blogTitle, setBlogTitle] = useState('');
    const [blogCategory, setBlogCategory] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('');
    const [blogImage, setBlogImage] = useState('');
    const [blogContent, setBlogContent] = useState('');

    const [successMessage, setSuccessMessage] = useState('');

    const handleAddProduct = (e) => {
        e.preventDefault();

        // Validation
        if (!productName || !productImage) {
            alert("Please fill in both name and image URL.");
            return;
        }

        if (selectedCategory === 'new-category' && !newCategoryName) {
            alert("Please provide a name for the new category.");
            return;
        }

        // Create new product object
        const newProduct = {
            name: productName,
            image: productImage
        };

        let targetCategoryKey = selectedCategory;

        // Handle completely new category creation
        if (selectedCategory === 'new-category') {
            // Generate a slug from the name (e.g. "Ovens & Grills" -> "ovens-grills")
            const newSlug = newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

            // Initialize the new category in our mock data
            productsData[newSlug] = {
                title: newCategoryName,
                slug: newSlug,
                description: "Newly added category.",
                products: []
            };

            targetCategoryKey = newSlug;

            // Optional: immediately switch the dropdown to the newly created category
            setSelectedCategory(newSlug);
        }

        // Add the product to the target category
        productsData[targetCategoryKey].products.push(newProduct);
        saveProductsData();

        // Show success and reset form
        setSuccessMessage(`Successfully added "${productName}" to ${productsData[targetCategoryKey].title}!`);
        setProductName('');
        setProductImage('');
        setNewCategoryName('');

        // Hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleDeleteProduct = (categoryKey, productIndex) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            productsData[categoryKey].products.splice(productIndex, 1);
            saveProductsData();
            setUpdateTrigger(prev => !prev);
            setSuccessMessage("Product deleted successfully.");
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    const handleAddBlog = (e) => {
        e.preventDefault();

        if (!blogTitle || !blogContent) {
            alert("Please fill in the blog title and content.");
            return;
        }

        const newSlug = blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const dateString = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        const newBlog = {
            slug: newSlug,
            title: blogTitle,
            image: blogImage || '/blog/download.jpg',
            date: dateString,
            category: blogCategory || 'General',
            author: blogAuthor || 'Admin',
            content: [
                {
                    heading: blogTitle,
                    text: blogContent
                }
            ]
        };

        blogsData.unshift(newBlog); // Add to the top of the blogs list
        saveBlogsData();

        setSuccessMessage(`Successfully published blog: "${blogTitle}"!`);
        setBlogTitle('');
        setBlogCategory('');
        setBlogAuthor('');
        setBlogImage('');
        setBlogContent('');

        setTimeout(() => setSuccessMessage(''), 3000);
    };

    return (
        <div className="min-h-screen bg-secondary flex">
            {/* Sidebar */}
            <aside className="w-64 bg-black/40 backdrop-blur-md border-r border-white/5 text-white hidden md:block shadow-2xl relative z-10">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-2xl font-bold font-heading text-accent">Admin Panel</h2>
                    <p className="text-sm text-gray-400 mt-1">Anna's Kitchen</p>
                </div>
                <nav className="mt-6 flex flex-col gap-2 px-4">
                    <button
                        onClick={() => setActiveTab('manage-products')}
                        className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'manage-products' ? 'bg-accent/10 text-accent border border-accent/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="font-medium">Manage Products</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'products' ? 'bg-accent/10 text-accent border border-accent/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="font-medium">Add Product</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('blogs')}
                        className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'blogs' ? 'bg-accent/10 text-accent border border-accent/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <span className="font-medium">Manage Blogs</span>
                    </button>
                    <Link to="/" className="flex items-center justify-center px-4 py-3 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300 mt-auto absolute bottom-6 w-[calc(100%-2rem)] border border-white/10 group">
                        <span className="font-medium group-hover:-translate-x-1 transition-transform">←</span>
                        <span className="font-medium ml-2">Back to Website</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 text-gray-300 relative">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

                <header className="flex justify-between items-center mb-8 relative z-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            {activeTab === 'manage-products' && 'Manage Products'}
                            {activeTab === 'products' && 'Add New Product'}
                            {activeTab === 'blogs' && 'Manage Blogs'}
                        </h1>
                        <p className="text-gray-400 mt-2">
                            {activeTab === 'manage-products' && 'View, edit, or delete existing equipment in your catalog.'}
                            {activeTab === 'products' && 'Add new equipment to your catalog.'}
                            {activeTab === 'blogs' && 'Publish new articles to your blog.'}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent/20 border border-accent/50 text-accent rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                            A
                        </div>
                    </div>
                </header>

                <div className={`bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 relative z-10 w-full`}>
                    <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                        {activeTab === 'manage-products' && 'Current Product Catalog'}
                        {activeTab === 'products' && 'Add New Product Form'}
                        {activeTab === 'blogs' && 'Add New Blog Form'}
                    </h2>

                    {successMessage && (
                        <div className="mb-6 bg-accent/10 border border-accent/30 text-accent px-4 py-3 rounded-xl relative shadow-[0_0_15px_rgba(212,175,55,0.1)]" role="alert">
                            <span className="block sm:inline font-medium">{successMessage}</span>
                        </div>
                    )}

                    {activeTab === 'manage-products' && (
                        <div className="space-y-8 animate-fadeIn">
                            {/* Filters Bar */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-black/20 p-4 rounded-xl border border-white/5">
                                <div className="w-full md:w-1/2">
                                    <input
                                        type="text"
                                        placeholder="Search products by name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-black/40 text-white placeholder-gray-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <label htmlFor="categoryFilter" className="text-sm font-medium text-gray-400 whitespace-nowrap">
                                        Category:
                                    </label>
                                    <select
                                        id="categoryFilter"
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="w-full md:w-auto px-4 py-3 border border-white/10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-black/40 text-white font-medium uppercase transition-all"
                                    >
                                        {Object.entries(productsData).map(([key, data]) => (
                                            <option key={key} value={key}>
                                                {data.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {Object.entries(productsData)
                                .filter(([categorySlug]) => categorySlug === filterCategory)
                                .map(([categorySlug, categoryData]) => {
                                    // Filter products within the category by search query
                                    const filteredProducts = categoryData.products.filter(product =>
                                        product.name.toLowerCase().includes(searchQuery.toLowerCase())
                                    );

                                    // Hide category entirely if search query doesn't match anything in it
                                    if (searchQuery && filteredProducts.length === 0) return null;

                                    return (
                                        <div key={categorySlug} className="bg-black/20 p-6 rounded-2xl border border-white/5">
                                            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex justify-between items-center">
                                                {categoryData.title}
                                                <span className="text-xs font-bold text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">{filteredProducts.length} Items</span>
                                            </h3>

                                            {filteredProducts.length === 0 ? (
                                                <p className="text-gray-500 text-sm italic py-4">No products found in this category.</p>
                                            ) : (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                                    {filteredProducts.map((product, index) => {
                                                        // Find original index for deletion to work correctly
                                                        const originalIndex = categoryData.products.findIndex(p => p.name === product.name);
                                                        return (
                                                            <div key={originalIndex} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-accent/50 transition-all duration-300 relative">
                                                                <button
                                                                    onClick={() => handleDeleteProduct(categorySlug, originalIndex)}
                                                                    className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg"
                                                                    title="Delete Product"
                                                                >
                                                                    <FaTrash className="text-xs" />
                                                                </button>

                                                                <div className="aspect-[4/3] bg-white p-4 relative flex items-center justify-center">
                                                                    <img
                                                                        src={product.image}
                                                                        alt={product.name}
                                                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                                                        onError={(e) => { e.target.src = '/images/logo.png' }}
                                                                    />
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                                </div>
                                                                <div className="p-5 flex-1 flex flex-col justify-between">
                                                                    <h4 className="font-bold text-sm text-white line-clamp-2 group-hover:text-accent transition-colors" title={product.name}>
                                                                        {product.name}
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className="flex flex-col lg:flex-row gap-12 animate-fadeIn">
                            <form onSubmit={handleAddProduct} className="space-y-6 lg:w-1/2">
                                {/* Category Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Select Category
                                    </label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-black/40 text-white font-medium uppercase transition-all"
                                    >
                                        {Object.entries(productsData).map(([key, data]) => (
                                            <option key={key} value={key}>
                                                {data.title}
                                            </option>
                                        ))}
                                        <option value="new-category" className="bg-accent/20 text-accent font-bold">
                                            + ADD NEW CATEGORY
                                        </option>
                                    </select>
                                </div>

                                {/* New Category Name (Conditional) */}
                                {selectedCategory === 'new-category' && (
                                    <div className="animate-fadeIn">
                                        <label className="block text-sm font-medium text-accent mb-2">
                                            New Category Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={newCategoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                            className="w-full px-4 py-3 border border-accent/40 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.1)] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-accent/5 text-white placeholder-accent/30 transition-all font-medium"
                                            placeholder="e.g. Ovens & Grills"
                                        />
                                    </div>
                                )}

                                {/* Product Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        className="w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-black/40 text-white placeholder-gray-500 transition-all font-medium"
                                        placeholder="e.g. Commercial Pizza Oven"
                                    />
                                </div>

                                {/* Product Image URL */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Image Path / URL
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={productImage}
                                        onChange={(e) => setProductImage(e.target.value)}
                                        className="w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-black/40 text-white placeholder-gray-500 transition-all font-medium"
                                        placeholder="e.g. /images/new-product.png or https://..."
                                    />
                                    <p className="text-xs text-gray-400 mt-2">
                                        Enter the local path to the image if it exists in the public folder, or a full valid URL.
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-secondary bg-accent hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(212,175,55,0.3)]"
                                    >
                                        {selectedCategory === 'new-category' ? 'Create Category & Add Product' : 'Add Product to Catalog'}
                                    </button>
                                </div>
                            </form>

                            <div className="lg:w-1/2">
                                <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">
                                    Live Preview
                                </h3>
                                <div className="max-w-[280px] mx-auto">
                                    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-accent/50 transition-all duration-300 relative">
                                        <div className="aspect-[4/3] bg-white p-4 relative flex items-center justify-center">
                                            <img
                                                src={productImage || '/images/logo.png'}
                                                alt={productName || 'Product Preview'}
                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => { e.target.src = '/images/logo.png' }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <h4 className="font-bold text-sm text-white line-clamp-2 group-hover:text-accent transition-colors" title={productName || 'Product Preview'}>
                                                {productName || 'Enter a product name'}
                                            </h4>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-xs mt-6 text-center italic">
                                        This is how your product will appear in the catalog.
                                        Ensure the image fits well within the aspect ratio.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'blogs' && (
                        <div className="flex flex-col lg:flex-row gap-12 animate-fadeIn">
                            <form onSubmit={handleAddBlog} className="space-y-6 lg:w-1/2">
                                {/* Blog Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Blog Title
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={blogTitle}
                                        onChange={(e) => setBlogTitle(e.target.value)}
                                        className="w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-black/40 text-white placeholder-gray-500 transition-all font-medium"
                                        placeholder="e.g. 5 Tips for Choosing Commercial Ovens"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Blog Category */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            value={blogCategory}
                                            onChange={(e) => setBlogCategory(e.target.value)}
                                            className="w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-black/40 text-white placeholder-gray-500 transition-all font-medium"
                                            placeholder="e.g. Guide, Review, News"
                                        />
                                    </div>

                                    {/* Blog Author */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            value={blogAuthor}
                                            onChange={(e) => setBlogAuthor(e.target.value)}
                                            className="w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-black/40 text-white placeholder-gray-500 transition-all font-medium"
                                            placeholder="e.g. Admin, Chef John"
                                        />
                                    </div>
                                </div>

                                {/* Blog Image URL */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Featured Image Path / URL
                                    </label>
                                    <input
                                        type="text"
                                        value={blogImage}
                                        onChange={(e) => setBlogImage(e.target.value)}
                                        className="w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-black/40 text-white placeholder-gray-500 transition-all font-medium"
                                        placeholder="e.g. /blog/download.jpg or https://..."
                                    />
                                </div>

                                {/* Blog Content */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Blog Content
                                    </label>
                                    <textarea
                                        required
                                        value={blogContent}
                                        onChange={(e) => setBlogContent(e.target.value)}
                                        rows="6"
                                        className="w-full px-4 py-3 border border-white/10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-black/40 text-white placeholder-gray-500 transition-all font-medium resize-y"
                                        placeholder="Write your blog post content here..."
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-secondary bg-accent hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(212,175,55,0.3)]"
                                    >
                                        Publish Blog Post
                                    </button>
                                </div>
                            </form>

                            <div className="lg:w-1/2">
                                <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">
                                    Live Preview
                                </h3>
                                <div className="max-w-md mx-auto">
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-lg group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] relative">
                                        <div className="h-48 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500 pointer-events-none"></div>
                                            <img
                                                src={blogImage || "/blog/download.jpg"}
                                                alt={blogTitle || "Blog Subject"}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => { e.target.src = '/images/logo.png' }}
                                            />
                                            {/* Category Badge overlay */}
                                            {blogCategory && (
                                                <div className="absolute top-4 right-4 z-20">
                                                    <span className="bg-accent text-secondary text-xs font-bold px-3 py-1.5 rounded-full uppercase shadow-lg">
                                                        {blogCategory}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 relative">
                                            <div className="flex items-center text-sm text-gray-400 mb-3 space-x-4">
                                                <span className="flex items-center">
                                                    <span className="w-2 h-2 rounded-full bg-accent mr-2"></span>
                                                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </span>
                                                <span className="flex items-center before:content-['•'] before:mr-4 before:text-gray-600">
                                                    {blogAuthor || 'Author Name'}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-accent transition-colors leading-tight">
                                                {blogTitle || 'Enter Your Blog Title Here'}
                                            </h3>
                                            <p className="text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">
                                                {blogContent || 'Your blog abstract or first few lines of content will appear here...'}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-xs mt-6 text-center italic">
                                        This simulates how your blog post will appear as a card on the main Blog Page.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
