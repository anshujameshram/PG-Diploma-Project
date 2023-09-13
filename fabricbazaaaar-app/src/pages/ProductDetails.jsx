
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import React, { useEffect,useState } from 'react';
import '../css/productPageStyle.css'
import Footer from '../components/Footer';
import { getProductById } from '../api-client/apiClient';
import Loader from '../components/Loader';

export default function ProductDetails() {

    const { productId } = useParams();
    const [productItem, setProduct] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData();
      });
    
      const fetchData = async () => {
        try {
          const prod = await getProductById(productId); // Fetch products from your API
          setProduct(prod);
          setLoading(false); 

        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    useEffect(() => {
        if(productItem){
        const imgSub = document.querySelectorAll(".sub-img img");
        const imgMain1 = document.getElementById("main-img1");
        const imgMain2 = document.getElementById("main-img2");

        imgSub.forEach((item, index) => {
            item.addEventListener("mouseover", function () {
                if (index % 2 !== 0) {
                    imgMain1.src = item.src;
                }
                else {
                    imgMain2.src = item.src
                }
            });
        });
    }
    }, [productItem])
    const platformPrices = productItem? [
        { platform: "Myntra", price: parseFloat(productItem.myntra_price) },
        { platform: "Amazon", price: parseFloat(productItem.amazon_price) },
        { platform: "Flipkart", price: parseFloat(productItem.flipkart_price) },
        { platform: "AJIO", price: parseFloat(productItem.ajio_price) },
        { platform: "Meesho", price: parseFloat(productItem.meesho_price) }
    ]:[];

    const lowestPriceObj = productItem?platformPrices.reduce((prev, current) =>
        prev.price < current.price ? prev : current
    ):{};
    const st = {
        width: '4rem',
        height: "2.5rem"
    }

    return (
        <>
            <NavBar />
           {loading?<Loader/>: <><div className="container-p">
                <div className="imgage-container">
                    <div className="main-img">
                        <img src={`data:image/jpg;base64,${productItem.img1}`} alt="" id="main-img2" />
                        <img src={`data:image/jpg;base64,${productItem.img4}`} alt="" id="main-img1" />
                    </div>
                    <div className="sub-img">
                        <img src={`data:image/jpg;base64,${productItem.img1}`} alt="" />
                        <img src={`data:image/jpg;base64,${productItem.img2}`} alt="" />
                        <img src={`data:image/jpg;base64,${productItem.img3}`} alt="" />
                        <img src={`data:image/jpg;base64,${productItem.img4}`} alt="" />
                    </div>
                </div>
                <div className="info-container">
                    <div className="product-name">{productItem.pname}</div>
                    <div className="divider"></div>
                    <div className="price-container">
                        <h3>Price :</h3>
                        <div className="price-info">
                            Lowest at
                            <a href={productItem[`${lowestPriceObj.platform.toLowerCase()}`]} target="_blank" rel="noopener noreferrer">
                                <img src={`/img/${lowestPriceObj.platform.toLowerCase()}.svg`} alt="" style={(lowestPriceObj.platform.toLowerCase() === "ajio") ? st : null} className="ecom-icon" />
                            </a>at just ₹{lowestPriceObj.price}
                        </div>
                        <div className="price-table">
                            <div>
                                <a href={productItem.myntra} target="_blank" rel="noopener noreferrer">
                                    <h4>Myntra</h4>
                                    <p>₹ {productItem.myntra_price}</p>
                                </a>
                            </div>

                            <div>
                                <a href={productItem.amazon} target="_blank" rel="noopener noreferrer">
                                    <h4>Amezon</h4>
                                    <p>₹ {productItem.amazon_price}</p>
                                </a>
                            </div>
                            <div>
                                <a href={productItem.flipkart} target="_blank" rel="noopener noreferrer">
                                    <h4>Flipkart</h4>
                                    <p>₹ {productItem.flipkart_price}</p>
                                </a>
                            </div>
                            <div>
                                <a href={productItem.ajio} target="_blank" rel="noopener noreferrer">
                                    <h4>Ajio</h4>
                                    <p>₹ {productItem.ajio_price}</p>
                                </a>
                            </div>
                            <div>
                                <a href={productItem.meesho} target="_blank" rel="noopener noreferrer">
                                    <h4>Meesho</h4>
                                    <p>₹ {productItem.meesho_price}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="product-description">
                        <h2>Product Details :</h2>
                        <p dangerouslySetInnerHTML={{ __html: productItem.pdesc.replace(/\\n/g, '<br>') }}>

                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>}</>
    )
}


