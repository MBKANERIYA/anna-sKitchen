import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHome, FaChevronRight, FaCalendar, FaUser, FaArrowLeft } from 'react-icons/fa';
import { fetchBlogs } from '../api/blogs';
import SEO from '../components/SEO';

const BlogPage = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlogData = async () => {
            try {
                const allBlogs = await fetchBlogs();
                const foundBlog = allBlogs.find((b) => b.slug === slug);
                setBlog(foundBlog || null);
                setRelatedBlogs(allBlogs.filter((b) => b.slug !== slug).slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch blog:", error);
            } finally {
                setLoading(false);
            }
        };
        loadBlogData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gold-light flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 text-lg">Loading blog...</p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gold-lighter">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-secondary font-heading mb-4">Blog Not Found</h2>
                    <p className="text-gray-medium mb-8">The blog post you're looking for doesn't exist.</p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-7 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                    >
                        <FaArrowLeft className="text-sm" />
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gold-light">
            <SEO title={blog ? blog.title : "Blog"} description={blog?.content?.[0]?.text?.substring(0, 160)} />
            {/* Hero Banner */}
            <div className="relative h-[45vh] min-h-[300px] overflow-hidden">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-secondary/30" />
                <div className="relative z-10 h-full flex flex-col justify-end pb-10 px-4">
                    <div className="max-w-4xl mx-auto w-full">
                        <span className="bg-accent text-secondary text-xs font-bold px-3 py-1 rounded-full">
                            {blog.category}
                        </span>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-4 font-heading leading-tight">
                            {blog.title}
                        </h1>
                        <div className="flex items-center gap-6 mt-4 text-white/70 text-sm">
                            <span className="flex items-center gap-2">
                                <FaCalendar className="text-accent text-xs" /> {blog.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaUser className="text-accent text-xs" /> {blog.author}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-gold-lighter border-b border-primary/10">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-medium">
                    <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                        <FaHome className="text-xs" /> Home
                    </Link>
                    <FaChevronRight className="text-xs text-gray-300" />
                    <span className="text-primary">Blog</span>
                </div>
            </div>

            {/* Blog Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="space-y-10">
                    {blog.content.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-xl md:text-2xl font-bold text-secondary font-heading mb-4">
                                {section.heading}
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-base">
                                {section.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Back Button */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
                    >
                        <FaArrowLeft className="text-sm" /> Back to Home
                    </Link>
                </div>
            </div>

            {/* Related Blogs */}
            <div className="bg-gold-lighter py-14">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-secondary mb-8 font-heading text-center">
                        Related Articles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedBlogs.map((b) => (
                            <Link
                                key={b.slug}
                                to={`/blog/${b.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={b.image}
                                        alt={b.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <span className="absolute top-4 left-4 bg-accent text-secondary text-xs font-bold px-3 py-1 rounded-full">
                                        {b.category}
                                    </span>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 text-gray-medium text-xs mb-3">
                                        <FaCalendar className="text-primary" />
                                        {b.date}
                                    </div>
                                    <h3 className="text-sm font-bold text-secondary leading-snug line-clamp-2 group-hover:text-primary transition-colors font-heading">
                                        {b.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
