import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../app/features/productsSlice";
import { createNote } from "../app/features/noteSlice";
import productImage from "../assets/images/productImage.png"


const Products = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    const products = useSelector((state) => state.products.data);
    const currentUser = useSelector((state) => state.users.currentUser)

    // Search state
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name'); // Default sort by name
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all'); // Default show all categories
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const handleDelete = async (id) => {
        try {
            const resultAction = await dispatch(deleteProduct(id));
            if (deleteProduct.fulfilled.match(resultAction)) {
                dispatch(createNote(["Product deleted successfully", "success"]));
                dispatch(getProducts());
            } else {
                dispatch(createNote(["Product delete failed, action not authorized", "fail"]));
            }
        }
        catch (error) {
            dispatch(createNote(["Product delete failed, action not authorized", "fail"]));
        }
    };

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getProducts());
        }
    }, [status, dispatch]);

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by category
    const categoryFilteredProducts = selectedCategory === 'all' 
        ? filteredProducts 
        : filteredProducts.filter(product => product.category === selectedCategory);

    // Sort filtered products
    const sortedProducts = [...categoryFilteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'price-low':
                return parseFloat(a.price) - parseFloat(b.price);
            case 'price-high':
                return parseFloat(b.price) - parseFloat(a.price);
            default:
                return 0;
        }
    });

    // Get unique categories from products
    const categories = ['all', ...new Set(products.map(product => product.category).filter(Boolean))];

    // Pagination logic
    const [currentPage, setCurrentPage] = React.useState(1);
    const productsPerPage = 16;
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Reset to first page when search term, sort, or category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortBy, selectedCategory]);

    return (
        <>
            <div className="products-error" style={{ color: "#e74c3c", textAlign: "center", margin: "1rem 0" }}>
                {error && <p>{error}</p>}
            </div>
            
            {/* Search Bar */}
            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                padding: "0 2rem", 
                marginBottom: "1rem"
            }}>
                <div style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "400px",
                    minWidth: "250px"
                }}>
                    <input
                        type="text"
                        placeholder="Search products by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.8rem 1rem 0.8rem 3rem",
                            border: "2px solid #e0e0e0",
                            borderRadius: "2rem",
                            fontSize: "1rem",
                            outline: "none",
                            transition: "border-color 0.2s, box-shadow 0.2s",
                            background: "#fff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "#2980b9";
                            e.target.style.boxShadow = "0 4px 16px rgba(41, 128, 185, 0.2)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#e0e0e0";
                            e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                        }}
                    />
                    <div style={{
                        position: "absolute",
                        left: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#666",
                        fontSize: "1.2rem"
                    }}>
                        🔍
                    </div>
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            style={{
                                position: "absolute",
                                right: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "none",
                                border: "none",
                                fontSize: "1.2rem",
                                cursor: "pointer",
                                color: "#999",
                                padding: "0.2rem"
                            }}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Sort and Filter Bar */}
            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                gap: "1rem",
                padding: "0 2rem", 
                marginBottom: "1.5rem",
                flexWrap: "wrap"
            }}>
                {/* Sort Dropdown */}
                <div style={{
                    position: "relative",
                    minWidth: "150px"
                }}>
                    <button
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                        style={{
                            width: "100%",
                            padding: "0.8rem 1rem",
                            border: "2px solid #e0e0e0",
                            borderRadius: "2rem",
                            fontSize: "1rem",
                            outline: "none",
                            transition: "all 0.2s ease",
                            background: "#fff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            color: "#333",
                            fontWeight: "500"
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "#2980b9";
                            e.target.style.boxShadow = "0 4px 16px rgba(41, 128, 185, 0.2)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#e0e0e0";
                            e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = "#2980b9";
                            e.target.style.transform = "translateY(-1px)";
                            e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = "#e0e0e0";
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                        }}
                    >
                        <span>
                            {sortBy === 'name' ? '📝 Sort by Name' : 
                             sortBy === 'price-low' ? '💰 Price: Low to High' : 
                             '💰 Price: High to Low'}
                        </span>
                        <span style={{ 
                            fontSize: "0.7rem", 
                            color: "#666",
                            transition: "transform 0.2s ease",
                            transform: showSortDropdown ? "rotate(180deg)" : "rotate(0deg)"
                        }}>▼</span>
                    </button>
                    
                    {showSortDropdown && (
                        <div style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            background: "#fff",
                            border: "2px solid #e0e0e0",
                            borderRadius: "1rem",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                            zIndex: 1000,
                            marginTop: "0.5rem",
                            overflow: "hidden",
                            minWidth: "200px"
                        }}>
                            <button
                                onClick={() => {
                                    setSortBy('name');
                                    setShowSortDropdown(false);
                                }}
                                style={{
                                    width: "100%",
                                    padding: "0.8rem 1rem",
                                    border: "none",
                                    background: sortBy === 'name' ? "linear-gradient(90deg, #2980b9 0%, #6dd5fa 100%)" : "#fff",
                                    color: sortBy === 'name' ? "#fff" : "#333",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: "1rem",
                                    transition: "all 0.2s ease",
                                    fontWeight: sortBy === 'name' ? "600" : "400"
                                }}
                                onMouseEnter={(e) => {
                                    if (sortBy !== 'name') {
                                        e.target.style.background = "#f8f9fa";
                                        e.target.style.transform = "translateX(4px)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (sortBy !== 'name') {
                                        e.target.style.background = "#fff";
                                        e.target.style.transform = "translateX(0)";
                                    }
                                }}
                            >
                                📝 Sort by Name
                            </button>
                            <button
                                onClick={() => {
                                    setSortBy('price-low');
                                    setShowSortDropdown(false);
                                }}
                                style={{
                                    width: "100%",
                                    padding: "0.8rem 1rem",
                                    border: "none",
                                    background: sortBy === 'price-low' ? "linear-gradient(90deg, #2980b9 0%, #6dd5fa 100%)" : "#fff",
                                    color: sortBy === 'price-low' ? "#fff" : "#333",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: "1rem",
                                    transition: "all 0.2s ease",
                                    fontWeight: sortBy === 'price-low' ? "600" : "400"
                                }}
                                onMouseEnter={(e) => {
                                    if (sortBy !== 'price-low') {
                                        e.target.style.background = "#f8f9fa";
                                        e.target.style.transform = "translateX(4px)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (sortBy !== 'price-low') {
                                        e.target.style.background = "#fff";
                                        e.target.style.transform = "translateX(0)";
                                    }
                                }}
                            >
                                💰 Price: Low to High
                            </button>
                            <button
                                onClick={() => {
                                    setSortBy('price-high');
                                    setShowSortDropdown(false);
                                }}
                                style={{
                                    width: "100%",
                                    padding: "0.8rem 1rem",
                                    border: "none",
                                    background: sortBy === 'price-high' ? "linear-gradient(90deg, #2980b9 0%, #6dd5fa 100%)" : "#fff",
                                    color: sortBy === 'price-high' ? "#fff" : "#333",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: "1rem",
                                    transition: "all 0.2s ease",
                                    fontWeight: sortBy === 'price-high' ? "600" : "400"
                                }}
                                onMouseEnter={(e) => {
                                    if (sortBy !== 'price-high') {
                                        e.target.style.background = "#f8f9fa";
                                        e.target.style.transform = "translateX(4px)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (sortBy !== 'price-high') {
                                        e.target.style.background = "#fff";
                                        e.target.style.transform = "translateX(0)";
                                    }
                                }}
                            >
                                💰 Price: High to Low
                            </button>
                        </div>
                    )}
                </div>

                {/* Category Filter Dropdown */}
                <div style={{
                    position: "relative",
                    minWidth: "150px"
                }}>
                    <button
                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        style={{
                            width: "100%",
                            padding: "0.8rem 1rem",
                            border: "2px solid #e0e0e0",
                            borderRadius: "2rem",
                            fontSize: "1rem",
                            outline: "none",
                            transition: "all 0.2s ease",
                            background: "#fff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            color: "#333",
                            fontWeight: "500"
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "#27ae60";
                            e.target.style.boxShadow = "0 4px 16px rgba(39, 174, 96, 0.2)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#e0e0e0";
                            e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = "#27ae60";
                            e.target.style.transform = "translateY(-1px)";
                            e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = "#e0e0e0";
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                        }}
                    >
                        <span>
                            {selectedCategory === 'all' ? '🏷️ All Categories' : `🏷️ ${selectedCategory}`}
                        </span>
                        <span style={{ 
                            fontSize: "0.7rem", 
                            color: "#666",
                            transition: "transform 0.2s ease",
                            transform: showCategoryDropdown ? "rotate(180deg)" : "rotate(0deg)"
                        }}>▼</span>
                    </button>
                    
                    {showCategoryDropdown && (
                        <div style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            background: "#fff",
                            border: "2px solid #e0e0e0",
                            borderRadius: "1rem",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                            zIndex: 1000,
                            marginTop: "0.5rem",
                            overflow: "hidden",
                            minWidth: "200px",
                            maxHeight: "300px",
                            overflowY: "auto"
                        }}>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setShowCategoryDropdown(false);
                                    }}
                                    style={{
                                        width: "100%",
                                        padding: "0.8rem 1rem",
                                        border: "none",
                                        background: selectedCategory === category ? "linear-gradient(90deg, #27ae60 0%, #2ecc71 100%)" : "#fff",
                                        color: selectedCategory === category ? "#fff" : "#333",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        fontSize: "1rem",
                                        transition: "all 0.2s ease",
                                        fontWeight: selectedCategory === category ? "600" : "400"
                                    }}
                                    onMouseEnter={(e) => {
                                        if (selectedCategory !== category) {
                                            e.target.style.background = "#f8f9fa";
                                            e.target.style.transform = "translateX(4px)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedCategory !== category) {
                                            e.target.style.background = "#fff";
                                            e.target.style.transform = "translateX(0)";
                                        }
                                    }}
                                >
                                    {category === 'all' ? '🏷️ All Categories' : `🏷️ ${category}`}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Search Results Info */}
            {searchTerm && (
                <div style={{ 
                    textAlign: "center", 
                    marginBottom: "1rem",
                    color: "#666",
                    fontSize: "0.9rem"
                }}>
                    Found {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} matching "{searchTerm}"
                </div>
            )}

            {(currentUser && currentUser.isAdmin) &&
                <div style={{ display: "flex", justifyContent: "flex-start", padding: "0 2rem" }}>
                    <Link to="/products/add"
                        className="add-product-btn"
                        style={{
                            textDecoration: "none",
                            background: "linear-gradient(90deg, #2980b9 0%, #6dd5fa 100%)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "0.5rem",
                            padding: "0.7rem 2rem",
                            fontWeight: 600,
                            fontSize: "1rem",
                            cursor: "pointer",
                            boxShadow: "0 4px 16px 4px rgba(52, 73, 94, 0.18)",
                            marginBottom: "1.5rem",
                            transition: "transform 0.2s, box-shadow 0.2s, background 0.2s"
                        }}
                        onClick={() => navigate("/products/add")}
                    >
                        Add Product
                    </Link>
                </div>}
            <div
                className="products-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "2rem",
                    padding: "2rem",
                    borderRadius: "1rem",
                    minHeight: "800px"
                }}
            >
                <style>
                    {`
                        .product-card {
                            transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
                        }
                        .product-card:hover {
                            transform: translateY(-8px) scale(1.03) rotate(-1deg);
                            box-shadow: 0 16px 48px 16px rgba(52,73,94,0.30), 0 24px 80px 24px rgba(44,62,80,0.22);
                            background: linear-gradient(120deg, #f0f8ff 0%, #e6f7ff 100%);
                        }
                        .delete-btn {
                            transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
                        }
                        .delete-btn:hover {
                            background: linear-gradient(90deg, #c0392b 0%, #e74c3c 100%);
                            box-shadow: 0 8px 32px 8px rgba(231, 76, 60, 0.18), 0 0 0 4px rgba(231,76,60,0.10);
                            transform: scale(1.07) rotate(-2deg);
                        }
                        .add-product-btn {
                            transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
                        }
                        .add-product-btn:hover {
                            transform: translateY(-4px) scale(1.05);
                            box-shadow: 0 8px 32px 8px rgba(52, 152, 219, 0.18);
                            background: linear-gradient(90deg, #6dd5fa 0%, #2980b9 100%);
                        }
                        .product-image {
                            width: 100%;
                            height: 180px;
                            object-fit: cover;
                            border: none;
                            border-radius: 1rem 1rem 0 0;
                            display: block;
                            margin-bottom: 1rem;
                            background: #f4f4f4;
                        }
                        .pagination {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            gap: 0.5rem;
                            margin: 2rem 0 1rem 0;
                        }
                        .pagination-btn {
                            background: #fff;
                            border: 1px solid #2980b9;
                            color: #2980b9;
                            border-radius: 0.4rem;
                            padding: 0.4rem 1rem;
                            font-weight: 600;
                            cursor: pointer;
                            transition: background 0.2s, color 0.2s;
                        }
                        .pagination-btn.active, .pagination-btn:hover {
                            background: #2980b9;
                            color: #fff;
                        }
                        .pagination-btn:disabled {
                            opacity: 0.5;
                            cursor: not-allowed;
                        }
                    `}
                </style>
                {paginatedProducts.map(product => (
                    <div
                        key={product._id}
                        className="product-card"
                        style={{
                            background: "#fff",
                            borderRadius: "1rem",
                            boxShadow: "0 8px 32px 8px rgba(52, 73, 94, 0.25), 0 16px 64px 16px rgba(44, 62, 80, 0.18)",
                            padding: "1.5rem",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            paddingTop: 0,
                            height: "350px"
                        }}
                    >
                        <img
                            className="product-image"
                            src={product.image || productImage}
                            alt={product.name}
                        />
                        <div className="product-info" style={{ flex: 1, width: "100%" }}>
                            <span
                                className="product-name"
                                style={{
                                    fontWeight: 600,
                                    fontSize: "1.2rem",
                                    color: "#222",
                                    marginBottom: "0.5rem",
                                    display: "block",
                                }}
                            >
                                {product.name}
                            </span>
                            <p
                                className="product-price"
                                style={{
                                    color: "#27ae60",
                                    fontWeight: 500,
                                    fontSize: "1rem",
                                    margin: 0,
                                }}
                            >
                                Price: {product.price} USD
                            </p>
                        </div>
                        <div className="product-actions" style={{ marginTop: "1.5rem", width: "100%" }}>
                            <button
                                className="delete-btn"
                                style={{
                                    background: "linear-gradient(90deg, #e74c3c 0%, #c0392b 100%)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "0.5rem",
                                    padding: "0.5rem 1.5rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    boxShadow: "0 4px 16px 4px rgba(52, 73, 94, 0.25), 0 8px 32px 8px rgba(44, 62, 80, 0.18)",
                                    transition: "background 0.2s, box-shadow 0.2s, transform 0.2s",
                                }}
                                onClick={() => {
                                    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
                                        handleDelete(product._id);
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination Container - Always present for consistent positioning */}
            <div style={{
                minHeight: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "2rem 0 1rem 0",
                border: "1px solid #ccc",
                background: "#f9f9f9",
                padding: "10px"
            }}>
                <div className="pagination" style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{
                            background: "#fff",
                            border: "1px solid #2980b9",
                            color: "#2980b9",
                            borderRadius: "0.4rem",
                            padding: "0.4rem 1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "background 0.2s, color 0.2s"
                        }}
                    >
                        Prev
                    </button>
                    {(() => {
                        let pages = [];
                        if (totalPages <= 5) {
                            for (let i = 1; i <= totalPages; i++) {
                                pages.push(i);
                            }
                        } else {
                            pages.push(1);
                            if (currentPage > 3) {
                                pages.push("...");
                            }
                            let start = Math.max(2, currentPage - 1);
                            let end = Math.min(totalPages - 1, currentPage + 1);
                            for (let i = start; i <= end; i++) {
                                pages.push(i);
                            }
                            if (currentPage < totalPages - 2) {
                                pages.push("...");
                            }
                            pages.push(totalPages);
                        }
                        return pages.map((page, idx) =>
                            page === "..." ? (
                                <span key={`ellipsis-${idx}`} style={{ padding: "0 0.5rem" }}>...</span>
                            ) : (
                                <button
                                    key={page}
                                    className={`pagination-btn${currentPage === page ? " active" : ""}`}
                                    onClick={() => handlePageChange(page)}
                                    style={{
                                        background: currentPage === page ? "#2980b9" : "#fff",
                                        border: "1px solid #2980b9",
                                        color: currentPage === page ? "#fff" : "#2980b9",
                                        borderRadius: "0.4rem",
                                        padding: "0.4rem 1rem",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "background 0.2s, color 0.2s"
                                    }}
                                >
                                    {page}
                                </button>
                            )
                        );
                    })()}
                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{
                            background: "#fff",
                            border: "1px solid #2980b9",
                            color: "#2980b9",
                            borderRadius: "0.4rem",
                            padding: "0.4rem 1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "background 0.2s, color 0.2s"
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default Products;