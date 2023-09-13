import React, { useEffect, useState } from 'react'
import { getCategories, updateProduct } from '../api-client/apiClient';
import Loader from './Loader';
// import React,{useState} from 'react'

export default function ProductEditForm({ item, onClose }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [categoryData, setCategories] = useState("");
    const [loading, setLoading] = useState(true);

    //product Details
    const [pname, setPName] = useState('');
    const [category, setCategory] = useState('');
    const [subctegory, setSubCategory] = useState('');
    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);
    const [img3, setImg3] = useState(null);
    const [img4, setImg4] = useState(null);
    const [amazon, setAmazon] = useState('');
    const [myntra, setMyntra] = useState('');
    const [flipkart, setFlipkart] = useState('');
    const [ajio, setAjio] = useState('');
    const [meesho, setMeesho] = useState('');
    const [pdesc, setPDesc] = useState('');

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
        setData();
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

    const setData = () => {
        setPName(item.pname);
        setCategory(item.category);
        setSubCategory(item.subctegory);
        setAmazon(item.amazon)
        setMyntra(item.myntra)
        setFlipkart(item.flipkart)
        setAjio(item.ajio)
        setMeesho(item.meesho)
        setPDesc(item.pdesc)
    }

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
        if (!img1) {
            const blob = new Blob([Uint8Array.from(atob(item.img1), c => c.charCodeAt(0))]);
            formData['img1'] = new File([blob], item.img1name, { type: 'image/jpeg' });
        }
        if (!img2) {
            const blob = new Blob([Uint8Array.from(atob(item.img2), c => c.charCodeAt(0))]);
            formData['img2'] = new File([blob], item.img2name, { type: 'image/jpeg' });
        }
        if (!img3) {
            const blob = new Blob([Uint8Array.from(atob(item.img3), c => c.charCodeAt(0))]);
            formData['img3'] = new File([blob], item.img3name, { type: 'image/jpeg' });
        }
        if (!img4) {
            const blob = new Blob([Uint8Array.from(atob(item.img4), c => c.charCodeAt(0))]);
            formData['img4'] = new File([blob], item.img4name, { type: 'image/jpeg' });
        }

        const data = {
            id: item.id,
            pname: pname,
            category: category,
            subctegory: subctegory,
            img1: formData['img1'],
            img2: formData['img2'],
            img3: formData['img3'],
            img4: formData['img4'],
            amazon: amazon,
            myntra: myntra,
            flipkart: flipkart,
            ajio: ajio,
            meesho: meesho,
            pdesc: pdesc
        }
        updateProduct(data).then(() => {
            onClose();
        })
    };

    const blob1 = new Blob([Uint8Array.from(atob(item.img1), c => c.charCodeAt(0))]);
    const tempimg = new File([blob1], item.img2name, { type: 'image/jpeg' });

    return (
        <>{loading ? <Loader /> : <form onSubmit={handleSubmit}>
            <div className="dialog-box" style={{ width: "auto" }}>
                <h2>Add Product Details</h2>

                <div className="name-group">
                    <label htmlFor="productName">Product Name:</label>
                    <input type="text" id="productName" name='pname' value={pname} onChange={(e) => {
                        handleInputChange(e)
                        setPName(e.target.value)
                    }} required />
                </div>
                <div className="cat-group">
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" value={category} onChange={(e) => {
                        handleCategoryChange(e)
                        handleInputChange(e)
                        setCategory(e.target.value)
                    }} required>
                        <option value="">Select Category</option>
                        {Object.keys(categoryData).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <img src="img/line-angle-right-icon.svg" alt="" height="15px" />

                    <select id="subCategory" name="subctegory" value={selectedSubcategory} onChange={(e) => {
                        handleSubcategoryChange(e)
                        handleInputChange(e)
                        setSubCategory(e.target.value);
                    }} required>
                        <option value="">Select Subcategory</option>
                        {selectedCategory && (categoryData[selectedCategory].map(subcategory => (
                            <option key={subcategory} value={subcategory}>{subcategory}</option>
                        )))}
                    </select>

                </div>

                <h3>Select Images</h3>
                <div className='old-images-group'>
                    {/* <img src={!img1 ? `data:image/jpg;base64,${item.img1}` : URL.createObjectURL(img1)} alt="" /> */}
                    <img src={!img1 ? URL.createObjectURL(tempimg) : URL.createObjectURL(img1)} alt="" />
                    <img src={!img2 ? `data:image/jpg;base64,${item.img2}` : URL.createObjectURL(img2)} alt="" />
                    <img src={!img3 ? `data:image/jpg;base64,${item.img3}` : URL.createObjectURL(img3)} alt="" />
                    <img src={!img4 ? `data:image/jpg;base64,${item.img4}` : URL.createObjectURL(img4)} alt="" />

                </div>
                <div className="image-group">

                    <div>
                        <label htmlFor="image1">Image 1</label>
                        <input type="file" name='img1' id="img1" accept=".jpg, .jpeg, .png" onChange={(e) => {
                            handleInputChange(e)
                            setImg1(e.target.files[0])
                        }} />
                        <label htmlFor="image1">Image 2</label>
                        <input type="file" name='img2' id="img2" accept=".jpg, .jpeg, .png" onChange={(e) => {
                            handleInputChange(e)
                            setImg2(e.target.files[0])


                        }} />
                    </div>
                    <div>
                        <label htmlFor="image1">Image 3</label>
                        <input type="file" name='img3' id="img3" accept=".jpg, .jpeg, .png" onChange={(e) => {
                            handleInputChange(e)
                            setImg3(e.target.files[0])


                        }} />
                        <label htmlFor="image1">Image 4</label>
                        <input type="file" name='img4' id="img4" accept=".jpg, .jpeg, .png" onChange={(e) => {
                            handleInputChange(e)
                            setImg4(e.target.files[0])
                        }} />
                    </div>
                </div>

                <h3>Platform Links</h3>
                <div className="link-group">
                    <div>
                        <input type="url" name='amazon' id="amazonLink" placeholder="Amazon" value={amazon} onChange={(e) => {
                            handleInputChange(e)
                            setAmazon(e.target.value)
                        }} required />
                        <input type="url" name='flipkart' id="flipkartLink" placeholder="Flipkart" value={flipkart} onChange={(e) => {
                            handleInputChange(e)
                            setFlipkart(e.target.value)
                        }} required />
                    </div>
                    <div>
                        <input type="url" name='myntra' id="myntraLink" placeholder="Myntra" value={myntra} onChange={(e) => {
                            handleInputChange(e)
                            setMyntra(e.target.value)
                        }} required />
                        <input type="url" name='meesho' id="meeshoLink" placeholder="Meesho" value={meesho} onChange={(e) => {
                            handleInputChange(e)
                            setMeesho(e.target.value)
                        }} required />
                    </div>
                    <input type="url" name='ajio' id="ajio" placeholder="Ajio" value={ajio} onChange={(e) => {
                        handleInputChange(e)
                        setAjio(e.target.value)
                    }} required />


                </div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name='pdesc' rows="4" value={pdesc.replace(/\\n/g, '\n')} onChange={(e) => {
                    handleInputChange(e)
                    setPDesc(e.target.value)
                }} required></textarea>

                <div className="btn-group">
                    <button type='submit' >Update</button>
                    <button onClick={onClose}>Close</button>
                </div>

            </div>
        </form>}
        </>
    )
}
