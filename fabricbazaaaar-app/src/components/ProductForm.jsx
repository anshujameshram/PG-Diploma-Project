import React, { useEffect, useState } from 'react'
import { addNewProduct, getCategories } from '../api-client/apiClient';
import Loader from './Loader';
// import React,{useState} from 'react'

export default function ProductForm({ isOpen, onClose }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [categoryData, setCategories] = useState("");
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        pname: '',
        category: '',
        subctegory: '',
        img1: null,
        img2: null,
        img3: null,
        img4: null,
        amazon: '',
        myntra: '',
        flipkart: '',
        ajio: '',
        meesho: '',
        pdesc: ''
    });

    useEffect(() => {
        fetchData();
    }, [loading]);

    const fetchData = async () => {
        try {
            const cat = await getCategories();
            setCategories(cat);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory(''); // Reset subcategory when category changes
    };

    const handleSubcategoryChange = (e) => {
        setSelectedSubcategory(e.target.value);
    };
    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        const inputValue = type === 'file' ? files[0] : value;


        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue

        }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        addNewProduct(formData).then(() => {
            onClose();
        })
    };

    return (
        <>{loading ? <Loader /> : <form onSubmit={handleSubmit}>
            <div className="dialog-box" style={{ width: "auto" }}>
                <h2>Add Product Details</h2>

                <div className="name-group">
                    <label htmlFor="productName">Product Name:</label>
                    <input type="text" id="productName" name='pname' onChange={handleInputChange} required />
                </div>
                <div className="cat-group">
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" onChange={(e) => {
                        handleCategoryChange(e)
                        handleInputChange(e)
                    }} required>
                        <option value="">Select Category</option>
                        {categoryData ? Object.keys(categoryData).map(category => (
                            <option key={category} value={category}>{category}</option>
                        )) : <>eee</>}
                    </select>
                    <img src="img/line-angle-right-icon.svg" alt="" height="15px" />

                    <select id="subCategory" name="subctegory" value={selectedSubcategory} onChange={(e) => {
                        handleSubcategoryChange(e)
                        handleInputChange(e)
                    }} required>
                        <option value="">Select Subcategory</option>
                        {selectedCategory && (categoryData[selectedCategory].map(subcategory => (
                            <option key={subcategory} value={subcategory}>{subcategory}</option>
                        )))}
                    </select>

                </div>
                <h3>Select Images</h3>
                <div className="image-group">
                    <div>
                        <label htmlFor="image1">Image 1</label>
                        <input type="file" name='img1' id="img1" accept=".jpg, .jpeg, .png" onChange={handleInputChange} required />
                        <label htmlFor="image1">Image 2</label>
                        <input type="file" name='img2' id="img2" accept=".jpg, .jpeg, .png" onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label htmlFor="image1">Image 3</label>
                        <input type="file" name='img3' id="img3" accept=".jpg, .jpeg, .png" onChange={handleInputChange} required />
                        <label htmlFor="image1">Image 4</label>
                        <input type="file" name='img4' id="img4" accept=".jpg, .jpeg, .png" onChange={handleInputChange} required />
                    </div>
                </div>

                <h3>Platform Links</h3>
                <div className="link-group">
                    <div>
                        <input type="text" name='amazon' id="amazonLink" placeholder="Amazon" onChange={handleInputChange} required />
                        <input type="text" name='flipkart' id="flipkartLink" placeholder="Flipkart" onChange={handleInputChange} required />
                    </div>
                    <div>
                        <input type="text" name='myntra' id="myntraLink" placeholder="Myntra" onChange={handleInputChange} required />
                        <input type="text" name='meesho' id="meeshoLink" placeholder="Meesho" onChange={handleInputChange} required />
                    </div>
                    <input type="text" name='ajio' id="ajio" placeholder="Ajio" onChange={handleInputChange} required />


                </div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name='pdesc' rows="4" onChange={handleInputChange} required></textarea>

                <div className="btn-group">
                    <button type='submit' >Submit</button>
                    <button onClick={onClose}>Close</button>
                </div>

            </div>
        </form>}
        </>
    )
}
