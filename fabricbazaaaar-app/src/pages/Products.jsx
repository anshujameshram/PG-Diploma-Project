import React, { useState, useEffect } from 'react'
import "../css/productListStyle.css"
import NavBar from '../components/NavBar'
import Product from '../components/Product';
import CategoryOption from '../components/CategoryOption';
import { getCategories, getProductsList } from '../api-client/apiClient';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = new useNavigate();
    const handleSearch = (term) => {
        setSearchTerm(term);
    };
    const [productList, setProductList] = useState(null)
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (!user) {
            navigate(`/login`);
        }

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const products = await getProductsList();
            const cat = await getCategories();
            setCategories(cat);
            setProductList(products);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    const filteredProducts = productList ? productList.filter((product) => {
        const cat = selectedCategory.split("\t"); // Use appropriate separator
        return (
            (!selectedCategory || (product.category.trim() === cat[0] && product.subctegory.trim() === cat[1]) || selectedCategory === 'ALL') &&
            product.pname.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }) : [];


    return (

        <>

            <NavBar onSearch={handleSearch} />
            {loading ? <Loader /> :
                <div className="container-q">
                    <div className="sidebar">
                        <div id="categoriesHeading">
                            <h2>Categories</h2>
                            <img src="img/line-angle-down-icon.svg" className="toggle-btn" alt='' />
                        </div>
                        <div className="divider"></div>
                        <div className="categoryList" id="category">

                            <div id="all-product" onClick={() => setSelectedCategory("ALL")}>All</div>
                            <ul className="main-list" id="categoryList">
                                {
                                    Object.entries(categories).map(([category, subCategories]) => (
                                        <CategoryOption key={category} category={category} subCategories={subCategories}
                                            onSelectCategory={setSelectedCategory}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="item-container">
                        <div id="productContainer" className="product-container-z">
                            {filteredProducts.map(product => {
                                const platformPrices = [
                                    { platform: "Myntra", price: parseFloat(product.myntra_price) },
                                    { platform: "Amazon", price: parseFloat(product.amazon_price) },
                                    { platform: "Flipkart", price: parseFloat(product.flipkart_price) },
                                    { platform: "AJIO", price: parseFloat(product.ajio_price) },
                                    { platform: "Meesho", price: parseFloat(product.meesho_price) }
                                ];

                                const lowestPriceObj = platformPrices.reduce((prev, current) =>
                                    prev.price < current.price ? prev : current
                                );
                                return (
                                    <Product classtype="product" key={product.id} id={product.id} img={product.img1} name={product.pname} price={`Lowest ₹ ${lowestPriceObj.price} at ${lowestPriceObj.platform}`} />
                                )
                            }
                            )}
                        </div>
                    </div>
                </div>}
        </>
    )
}
